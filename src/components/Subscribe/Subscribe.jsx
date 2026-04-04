import React, { useState } from 'react';
import './Subscribe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Subscribe = () => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
   };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing, ${formData.name}! A confirmation has been sent to ${formData.email}`);
    // Reset form
    setFormData({ name: '', email: '', password: ''});
  };

  return (
    <div className="subscribe__container">
      <Link to="/" className="subscribe__link">
        <FontAwesomeIcon icon="arrow-left" />
        <h2 className="subscribe__selected--top">Back to Home</h2>
      </Link>
      <h1 className="subscribe__header">Subscribe to <span className="royal"><i><u> The Movie Library!</u></i></span></h1>
      <form className="subscribe__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters" 
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="subscribe__button" type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default Subscribe;