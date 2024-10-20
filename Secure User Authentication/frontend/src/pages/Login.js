import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './login.css';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirecting after successful login

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // If login is successful, store the token and redirect
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        alert('Login successful!');
        navigate('/dashboard'); // Redirect to dashboard or home page after login
      }
    } catch (error) {
      setError('Invalid email or password'); // Show error if login fails
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    
    </div>
  );
}

export default Login;

