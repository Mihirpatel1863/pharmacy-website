
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';  
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

const OrderHistory = () => {
    const { user } = useUser();  
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
     
      if (!user) {
          alert('You must be logged in to view your order history.');
          navigate('/login');
      } else {
          
          const userOrdersKey = `orderHistory_${user.username}`;
          const userOrders = JSON.parse(localStorage.getItem(userOrdersKey)) || [];
          console.log(`Fetched orders for ${user.username}:`, userOrders); 
          setOrders(userOrders);
      }
  }, [user, navigate]);
  

    return (
        <div className="order-history">
            <h2>Order History for {user.username}</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order, index) => (
                        <li key={index}>
                            <h3>Order #{index + 1}</h3>
                            <p>Date: {order.date}</p>
                            <ul>
                                {order.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        {item.name} - ${item.price} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                            <p>Total: ${order.total}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found for {user.username}.</p>
            )}
        </div>
    );
};

export default OrderHistory;
