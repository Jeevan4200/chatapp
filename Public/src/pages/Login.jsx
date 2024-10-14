import React, { useState } from 'react';
import axios from 'axios';
import { loginroute } from '../utils/ApiRoutes';
import './Login.css'; // CSS import

const Login = () => {
  const [data, setData] = useState({
    name: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, password } = data;
    try {
      const response = await axios.post(loginroute, { name, password });
      if (response.data.status === false) {
        setError(response.data.message); // Display error from server
      } else {
        console.log('Login successful:', response.data);
        // Add further login logic here
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again.');
    }
  };

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            placeholder="Enter your username"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        {error && <span className="error">{error}</span>}
        <div className="submit">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
