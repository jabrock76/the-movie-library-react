import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Search.css';

// Make props optional by providing default empty functions to prevent crashes
const Search = ({
  initialSearchTerm = "",
  initialYearFilter = "1950",
  onSearch, // This prop will ONLY exist when used in Movies.jsx
  onYearChange,
  onReset,
}) => {
  const [localTerm, setLocalTerm] = useState(initialSearchTerm);
  const [localYear, setLocalYear] = useState(initialYearFilter);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalTerm(initialSearchTerm);
    setLocalYear(initialYearFilter);
  }, [initialSearchTerm, initialYearFilter]);

  const handleSearchClick = () => {
    if (onSearch) {
      // BEHAVIOR 1: If onSearch prop exists (we are on Movies.jsx), use it.
      onSearch(localTerm);
    } else {
      // BEHAVIOR 2: If onSearch prop does NOT exist (we are on Home.jsx), navigate.
      if (localTerm.trim()) {
        navigate(`/movies?search=${localTerm}`);
      }
    }
  };

  const handleSliderChange = (e) => {
    const newYear = e.target.value;
    setLocalYear(newYear);
    if (onYearChange) {
      onYearChange(newYear);
    }
  };

  const handleResetClick = () => {
    if (onReset) {
      onReset();
    }
    setLocalYear('1950');
  };

  const paintSlider = (value) => {
    if (sliderRef.current) {
      const min = 1950;
      const max = 2026;
      const percentage = ((value - min) / (max - min)) * 100;
      sliderRef.current.style.background = `linear-gradient(to right, royalblue ${percentage}%, rgb(221, 221, 221) ${percentage}%)`;
    }
  };

  useEffect(() => {
    paintSlider(localYear);
  }, [localYear]);

  // If onSearch exists, it means we are on the results page.
  const isResultsPage = !!onSearch;

  return (
    <div className="container">
      <div className="input__wrapper">
        <input className="input__search"
          type="text"
          value={localTerm}
          onChange={(e) => setLocalTerm(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearchClick()}
          placeholder="Search by Keywords..."
        />
        <button className="btn" onClick={handleSearchClick}>
          Search <FontAwesomeIcon icon="spinner" className="btn__loading" />
        </button>
      </div>

      {/* Only show the filter section if we are on the results page */}
      {isResultsPage && (
        <div className="row__header">
          <div className="searched__row">
            <h2 className="searched__results">
              Search Results for:{" "}
              <span className="searched__result">{initialSearchTerm}</span>
            </h2>
          </div>
          <div className="filter__row">
            <h3>Filter by Year</h3>
            <div className="slider__container">
              <span className="slider__min">1950</span>
              <input
                ref={sliderRef}
                className="year__slider"
                type="range"
                min="1950"
                max="2026"
                value={localYear}
                onChange={handleSliderChange}
              />
              <span className="slider__max">2026</span>
              <span className="slider__current">{localYear}</span>
            </div>
            <button className="btn reset__btn" onClick={handleResetClick}>
              Reset Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;