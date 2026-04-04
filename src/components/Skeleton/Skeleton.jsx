import React from 'react';
import './Skeleton.css';

const Skeleton = ({ type }) => {
  const skeletonCount = 8;

  if (type === 'movie-card') {
    return (
      <>
        {[...Array(skeletonCount)].map((_, index) => (
          <div key={index} className="movie-card skeleton">
            <div className="skeleton__poster"></div>
            <div className="skeleton__title"></div>
            <div className="skeleton__year"></div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'movie-info') {
    return (
      <>
        <div className="movie__selected--top">
          <div className="skeleton__back-button"></div>
        </div>
        <div className="movie__selected">
          <figure className="movie__selected--img">
            <div className="skeleton__poster--large"></div>
          </figure>
          <div className="movie__selected--description">
            <div className="skeleton__title--large"></div>
            <div className="skeleton__text"></div>
            <div className="skeleton__text"></div>
            <div className="skeleton__text"></div>
            <div className="skeleton__text"></div>
            <div className="skeleton__text"></div>
            <div className="skeleton__text--long"></div>
            <div className="skeleton__text"></div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default Skeleton;
