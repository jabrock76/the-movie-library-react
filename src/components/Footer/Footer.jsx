import React from 'react'
import LibraryLogo from '../../assets/The Movie Library Logo.jpg';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <div className="footer__container">
        <div className="footer__row">
          <img 
            className="footer__img"
            src={LibraryLogo} 
            alt="Library Logo" />
          <div className="footer__copyright">&copy; 2026 The Movie Library All Rights Reserved</div>
        </div>
      </div>
    </>
  )
}

export default Footer
