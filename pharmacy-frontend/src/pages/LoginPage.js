import React, { useState } from 'react';
import './LoginPage.css'; 
import backgroundImage from '../assets/background.jpg'; 

const LoginPage = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (isRegistering) {
      const existingUser = storedUsers.find(user => user.username === username);
      if (existingUser) {
        setErrorMessage('Username already exists. Please choose a different one.');
      } else {
        const newUser = { username, password };
        localStorage.setItem('users', JSON.stringify([...storedUsers, newUser]));
        alert('Registration successful! Please log in.');
        setIsRegistering(false);
        setUsername('');
        setPassword('');
        setErrorMessage('');
      }
    } else {
      const storedUser = storedUsers.find(user => user.username === username && user.password === password);
      if (storedUser) {
        setErrorMessage('');
        onLogin({ username });
        setUsername('');
        setPassword('');
      } else {
        setErrorMessage('Invalid username or password.');
      }
    }
  };

  return (
    <div 
      className="login-page" 
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', color: 'white' }}
    >
      <div className="form-container">
        <h2 className="form-heading">{isRegistering ? 'Register' : 'Login'}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form className="fade-in" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          <button type="submit" className="button">{isRegistering ? 'Register' : 'Login'}</button>
        </form>
        <button onClick={() => setIsRegistering(!isRegistering)} className="toggle-button">
          {isRegistering ? 'Already have an account? Login' : 'New here? Register'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
