import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css';

const Login = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
    useEffect (() => {
      const storedSubscriptions = JSON.parse(localStorage.getItem('mySubscription')) || [];
      setSubscriptions(storedSubscriptions);
    }, []);
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
      if (error) setError('');
     };
  
    const handleSubmit = (e) => {
      e.preventDefault(); 

      const user = subscriptions.find(
        sub => sub.email === formData.email && sub.password === formData.password
      );
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isSubscribed', 'true');

        alert (`Welcome back, ${user.name}!`);

        setFormData({email: '', password: ''});
        navigate('/');
      } else {
        setError('Invalid email or password.  Please try again.');
      }
    };

  return (
    <div>
       <div className="login__container">
          <Link to="/" className="login__link">
          <FontAwesomeIcon icon="arrow-left" />
            <h2 className="login__selected--top">Back to Home</h2>
          </Link>
          <h1 className="login__header">Login to your <span className="royal"><i><u> Movie Library</u></i></span> account!</h1>
          <form className="login__form" onSubmit={handleSubmit}>
            {error && <p className="login__error">{error}</p>}
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
            <button className="login__button" type="submit">Login</button>
          </form>
          <p className="login__signup">
            Don't have an account? <Link to="/subscribe">Subscribe here</Link>
          </p>
        </div>
    </div>
  );
};

export default Login
