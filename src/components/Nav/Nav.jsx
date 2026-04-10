import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBackground from '../../assets/Movies Library.jpg';
import LibraryLogo from '../../assets/The Movie Library Logo.jpg';
import { Link, useNavigate } from "react-router-dom";
import './Nav.css';

const Nav = () => {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');

    if (confirmLogout) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('isSubscribed');
      localStorage.removeItem('currentUser');
      alert('You have been logged out successfully');
      closeMenu();
      navigate('/login');
    }
  };

  return (
    <nav>
      <div className="nav__container">
      <img
        className="nav__background"
        src={NavBackground}
        alt="Nav Background"
      />
      <div className="row nav__row">
        <div className="nav__logo">
          <img
            className="nav__logo--img"
            src={LibraryLogo}
            alt="The Movie Library Logo"
          />
          <div className="nav__logo--title"></div>
        </div>
        <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          <li className="nav__list">
            <Link to="/" className="nav__link" onClick={closeMenu}>Home</Link>
          </li>
          <li className="nav__list">
            <Link to="/movies" className="nav__link" onClick={closeMenu}>Find your Show</Link>
          </li>
          <li className="nav__list">
            <Link to="/watchlist" className="nav__link" onClick={closeMenu}>Watchlist</Link>
          </li>
          <li className="nav__list">
            <Link to="/subscribe" className=" nav__link nav__link--primary" onClick={closeMenu}>Subscribe</Link>
          </li>
          <li className="nav__list">
            {isLoggedIn ? (
              <button className="nav__link nav__link--primary" onClick={handleLogout}>Logout ({currentUser?.name})</button>
            ) : (
              <Link to="/login" className="nav__link nav__link--primary" onClick={closeMenu}>Login</Link>
            )}
          </li> 
        </ul>
        <button className="mobile__menu--btn" onClick={toggleMenu}>
            <FontAwesomeIcon icon={menuOpen ? "times" : "bars"} />
        </button>
      </div>
      </div>
    </nav>
  );
};

export default Nav;
