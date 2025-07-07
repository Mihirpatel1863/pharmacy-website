import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './PaymentPage.css'; 

const PaymentPage = () => {
    const navigate = useNavigate();
    const { cart, dispatch } = useCart();
    const [address, setAddress] = useState('');

    
    const formatPrice = (price) => {
        return Number(price).toFixed(2);
    };

    
    const calculateSubtotal = () => {
        return cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0).toFixed(2);
    };

    
    const handlePayment = () => {
        if (!address.trim()) {
            alert('Please enter a delivery address');
            return;
        }

        
        setTimeout(() => {
            alert(`Payment successful! Your order will be delivered to: ${address}`);
            dispatch({ type: 'CLEAR_CART' }); 
            navigate('/'); 
        }, 1000); 
    };

    return (
        <div className="payment-page">
            <h2>Bill</h2>
            {cart.length > 0 ? (
                <div className="bill-summary">
                    <h3>Order Summary</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${formatPrice(item.price)}</td>
                                    <td>${formatPrice(item.price * item.quantity)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="bill-total">
                        <h3>Subtotal: ${calculateSubtotal()}</h3>
                    </div>

                    <div className="address-section">
                        <h3>Delivery Address</h3>
                        <textarea 
                            placeholder="Enter your delivery address..." 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            className="address-input"
                        />
                    </div>

                    <button className="pay-button" onClick={handlePayment}>Pay with Google Pay</button>
                </div>
            ) : (
                <p>No items in the cart</p>
            )}
        </div>
    );
};

export default PaymentPage;
