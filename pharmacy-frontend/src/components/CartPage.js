import React from 'react';
import { useCart } from '../context/CartContext'; 
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { useUser } from '../context/UserContext'; 
import './CartPage.css';

const CartPage = () => {
    const { cart, dispatch } = useCart();
    const { user } = useUser(); 
    const navigate = useNavigate();

    // ✅ Use environment variable for backend URL
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + (Number(item.price) * item.quantity), 0).toFixed(2);
    };

    const handleRemoveFromCart = async (id) => {
        const itemToRemove = cart.find(item => item.id === id);

        try {
            await axios.patch(`${API_BASE_URL}/api/products/${itemToRemove.id}/`, {
                stock: itemToRemove.stock + 1
            });

            dispatch({ type: 'REMOVE_FROM_CART', payload: id });
        } catch (error) {
            console.error('Error updating stock:', error);
        }
    };

    const handleBuy = () => {
        if (!user) {
            alert('You must be logged in to place an order.');
            return;
        }
    
        const orderDetails = {
            items: cart,
            total: calculateSubtotal(),
            date: new Date().toLocaleDateString(),
        };
    
        const orderHistoryKey = `orderHistory_${user.username}`;
        const orderHistory = JSON.parse(localStorage.getItem(orderHistoryKey)) || [];
        orderHistory.push(orderDetails);
        localStorage.setItem(orderHistoryKey, JSON.stringify(orderHistory));
    
        console.log(`Order saved for ${user.username}:`, orderDetails); 
    
        localStorage.removeItem('cart');
    
        navigate('/payment');
    };
    
    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cart.length > 0 ? (
                <>
                    <ul className="cart-items-list">
                        {cart.map(item => (
                            <li key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p><strong>Price:</strong> ${Number(item.price).toFixed(2)}</p>
                                    <p><strong>Quantity:</strong> {item.quantity}</p>
                                </div>
                                <button onClick={() => handleRemoveFromCart(item.id)} className="remove-button">Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Subtotal: ${calculateSubtotal()}</h3>
                        <button onClick={handleBuy} className="buy-button">Buy</button>
                    </div>
                </>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default CartPage;
