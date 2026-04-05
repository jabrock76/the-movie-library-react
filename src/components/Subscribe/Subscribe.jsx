import React, { useEffect, useState } from 'react';
import './Subscribe.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';

const Subscribe = () => {
  const [subscription, setSubscription] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  useEffect (() => {
    const storedSubscription = JSON.parse(localStorage.getItem('mySubscription')) || [];
    setSubscription(storedSubscription);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
   };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSubscription = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      subscribedAt: new Date().toISOString()
    };

    const updatedSubscriptions = [...subscription, newSubscription];

    localStorage.setItem('mySubscription', JSON.stringify(updatedSubscriptions));
    setSubscription(updatedSubscriptions);

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isSubscribed', 'true');
    localStorage.setItem('currentUser', JSON.stringify(newSubscription));

    alert(`Thank you for subscribing, ${formData.name}! A confirmation has been sent to ${formData.email}`);
  
    setFormData({ name: '', email: '', password: ''});

    navigate('/');
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