import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Watchlist.css'

const Watchlist = () => {
  const [formData, setFormData] = useState({title: ''});
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();

  const canAddToWatchlist = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isSubscribed = localStorage.getItem('isSubscribed') === 'true';
    return isLoggedIn && isSubscribed;
  };

  useEffect (() => {
    const storedWatchlist = JSON.parse(localStorage.getItem('myWatchlist')) || [];
    setWatchlist(storedWatchlist);
  }, []);
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      
      if (!canAddToWatchlist()) {
      alert('Please log in or subscribe to add movies to your watchlist');
      navigate('/login'); 
      return;
      }

      if (!formData.title) 
        return;

      const newMovie = {
        id: `manual-${Date.now()}`,
        title: formData.title
      };

      const updatedWatchlist = [...watchlist, newMovie];
      
      setWatchlist(updatedWatchlist);
      localStorage.setItem('myWatchlist', JSON.stringify(updatedWatchlist));

      setFormData({ title: ''});
    };

    const handleRemoveMovie = (movieId) => {
      const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);

      setWatchlist(updatedWatchlist);
      localStorage.setItem('myWatchlist', JSON.stringify(updatedWatchlist));
    };
   
  return (
    <div className="watchlist__container">
        <Link to="/" className="watchlist__link">
          <FontAwesomeIcon icon="arrow-left" />
          <h2 className="watchlist__selected--top">Back to Home</h2>
        </Link>
    <div className="watchlist__info">
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
        <button className="watchlist__button" type="submit">
          Add to your Watchlist
        </button>
      </form>
      <h2 className="watchlist__list"><u>My Watchlist</u></h2>
      <div className="movie__list--container">
        {watchlist.length > 0 ? (
          watchlist.slice(0, 12).map(movie => (
            <div className="movie__item" key={movie.id}>
              <h3 className="movie__item--title">{movie.title}</h3>
              <button className="watchlist__remove--button" onClick={() => handleRemoveMovie(movie.id)}>Remove</button>
            </div>
          ))
        ) : (
            <p className="watchlist__info">Your watchlist is empty.  Add some shows!</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Watchlist;
