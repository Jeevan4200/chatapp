import React, { useState } from 'react';
import './Register.css';
import logo from '../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { registerRoute } from '../utils/ApiRoutes';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Form validation function
  const validateForm = (data) => {
    let formErrors = {};

    if (!data.name) {
      formErrors.name = 'Name is required';
    }

    if (!data.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      formErrors.email = 'Email is invalid';
    }

    if (!data.password) {
      formErrors.password = 'Password is required';
    } else if (data.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long';
    }

    if (data.password !== data.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(formData);

    if (Object.keys(formErrors).length === 0) {
      try {
        const { password, name, email } = formData;
        const { data } = await axios.post(registerRoute, { name, email, password });

        // Assuming 'data.status' indicates success
        if (data.status === true) {
          localStorage.setItem('chat-app-user', JSON.stringify(data.user));
          navigate('/'); // Navigate to home or designated route
        } else {
          setErrors({ serverError: data.message });
        }

      } catch (error) {
        console.error('Error during registration:', error);
        setErrors({ serverError: 'Registration failed. Please try again later.' });
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="brand">
          <img src={logo} alt="Logo" />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        {errors.serverError && <span className="error">{errors.serverError}</span>}

        <button type="submit">Register</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
