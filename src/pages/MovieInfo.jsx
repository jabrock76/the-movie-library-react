import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Skeleton from '../components/Skeleton/Skeleton';

const MovieInfo = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const backToMoviesUrl = `/movies?${searchParams.toString()}`;

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=1d17f1a4`);
        if (data.Response === "True") {
          setMovie(data);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) getMovieDetails();
  }, [id]);

  return (
    <div className="movies__body">
      <div className="movies__main">
        <div className="movies__container">
          <div className="row"> { loading ? ( <Skeleton type="movie-info" />) : !movie ? ( <h2>Movie not found.</h2>) : (
          <>
            <div className="movie__selected--top">
              {/* 3. Use the dynamic URL in the Link component */}
              <Link to={backToMoviesUrl} className="movie__link">
                <FontAwesomeIcon icon="arrow-left" />
                <h2 className="movie__selected--top">Back to Movies</h2>
              </Link>
            </div>
            <div className="movie__selected">
              <figure className="movie__selected--img">
                <img src={movie.Poster} alt="Movie Poster" />
              </figure>
              <div className="movie__selected--description">
                <h1 className="movie__selected--title"><u>{movie.Title}</u></h1>
                <p><b>Release Year:</b> {movie.Year}</p>
                <p><b>Actors:</b> {movie.Actors}</p>
                <p><b>Director:</b>{movie.Director}</p>
                <p><b>Rating:</b> {movie.Rated}</p>
                <p><b>Genre:</b> {movie.Genre}</p>
                <p><b>Plot:</b> <i>{movie.Plot}</i></p>
                <p><b>Runtime:</b> {movie.Runtime}</p>
              </div>
            </div>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;
