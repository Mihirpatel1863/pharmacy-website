import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import ProductsList from './components/ProductsList';
import CartPage from './components/CartPage';

import LoginPage from './pages/LoginPage';
import OrderHistory from './pages/OrderHistory';  
import { CartProvider } from './context/CartContext';
import { UserProvider, useUser } from './context/UserContext';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

import './App.css';

function AppContent() {
  const { user, setUser } = useUser();  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); 
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
        localStorage.removeItem('user');
      }
    }
  }, [setUser]);  

  const handleLogin = (userData) => {
    setUser(userData);  
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);  
    localStorage.removeItem('user');
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="App">
   <header className="navbar">
  <div className="logo">
    <img src="/logo.png" alt="Pharmacy Store Logo" className="logo-image" />
    <h1 className='name'>Medicomart</h1>
  </div>
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/contact">Contact Us</Link></li>
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="/cart">Cart</Link></li>
      {user ? (
        <>
          <li className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
              Account
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/order-history" onClick={() => setDropdownOpen(false)}>Order History</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            )}
          </li>
          <li>Welcome, {user.username}</li>
        </>
      ) : (
        <li><Link to="/login">Login</Link></li>
      )}
    </ul>
  </nav>
</header>


<Routes>
  <Route path="/login" element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/" />} />
  <Route path="/" element={<ProductsList />} />
  <Route path="/cart" element={<CartPage />} />

  <Route path="/order-history" element={user ? <OrderHistory user={user} /> : <Navigate to="/login" />} />
  <Route path="/about" element={<AboutUs />} /> 
  <Route path="/contact" element={<ContactUs />} />  
</Routes>


      <footer className="footer">
        <p>© 2024 Medicomart. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <UserProvider> 
      <CartProvider>
        <Router>
          <AppContent /> 
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
