import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import './MovieResults.css';
import Skeleton from '../Skeleton/Skeleton';
import LandingBackground from "../../assets/favorite-movies.jpm.jpg";

const MovieResults = ({ searchTerm, yearFilter }) => {
  const [ searchParams ] = useSearchParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovie = async () => {
      if (!searchTerm) {
        setMovie([]);
        return;
      }

      setLoading(true);
      try {
        const { data } = await axios.get(`https://www.omdbapi.com/?apikey=1d17f1a4&s=${searchTerm}`);
        console.log('API Response:', data.Search);
        setMovie(data.Search || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovie([]);
      } finally {
        setLoading(false);
      }
    }
    getMovie();
}, [searchTerm]);

  const filteredMovies = movie
    .filter((m) => {
      const movieYear = parseInt(m.Year);
      console.log(`Movie: ${m.Title}, Year: ${m.Year}, Parsed: ${movieYear}, Filter: ${yearFilter}, Pass: ${movieYear >= yearFilter}`);
      return !isNaN(movieYear) && movieYear >= yearFilter;
    })
    .filter((movie, index, self) => 
      index === self.findIndex((m) => m.imdbID === movie.imdbID)
    ); 

  console.log('Year Filter:', yearFilter);
  console.log('Total movies:', movie.length);
  console.log('Filtered Movies:', filteredMovies.length);


  return (
    <>
      <div className="container">
        <div className="row movies__row">
          <div className="results-grid">
            { loading ? ( <Skeleton type="movie-card" /> ) :
              filteredMovies && filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <div className="movie-card" key={movie.imdbID}>
                  <Link to={`/movie/${movie.imdbID}?${searchParams.toString()}`} className="movie-link">
                    <img src={movie.Poster} alt="Movie Poster" />
                    <h3>{movie.Title}</h3>
                    <p>Release Year: {movie.Year}</p>
                  </Link>
                </div>
              ))
            ) : (
              <img
              className="landing__img"
              src={LandingBackground}
              alt="Landing Background" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieResults;
