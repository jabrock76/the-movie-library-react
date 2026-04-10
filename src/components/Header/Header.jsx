import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <>
      <div className="container">
        <div className="row search__row">
          <div className="header__tag">
            <h2>A World of Entertainment at your <span className="royal"><u>Fingertips!</u></span></h2>
          </div>
          <div className="header__description">
            <h3>Find the Movie or Show you are looking for with <span className="fuchsia"><u>'The Movie Library'</u></span></h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header

