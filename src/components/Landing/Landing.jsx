import React from 'react';
import LandingBackground from "../../assets/favorite-movies.jpm.jpg";
import './Landing.css';

const Landing = () => {
  return (
    <>
      <div className="landing__container">
        <div className="row row__landing">
          <div id="movieResults" className="results-grid">
            <img
              className="landing__img"
              src={LandingBackground}
              alt="Landing Background" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
