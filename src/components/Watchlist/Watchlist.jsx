import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Watchlist.css'

const Watchlist = () => {
  console.log('Watchlist Component Rendered');
  const [formData, setFormData] = useState({
      title: ''
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      alert(`Movie "${formData.title}" has been added to your watchlist!`);
      // Reset form
      setFormData({ title: '', title: ''});
    };
  
  return (
    <div className="watchlist__container">
      <Link to="/" className="watchlist__link">
        <FontAwesomeIcon icon="arrow-left" />
        <h2 className="watchlist__selected--top">Back to Home</h2>
      </Link>
      <h1 className="watchlist__header">Add a Title to your <span className="royal"><i><u>Watchlist!</u></i></span></h1>
      <form className="watchlist__form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder=" Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
         <input
          type="text"
          name="title"
          placeholder=" Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <button className="watchlist__button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Watchlist;
