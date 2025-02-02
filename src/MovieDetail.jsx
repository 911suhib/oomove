import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
 
function MovieDetail() {
  const { id } = useParams();  
  const [movieDetails, setMovieDetails] = useState(null);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const API_KEY = "aaa6b836a431ce9f39a420fbf5358806";

   useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        );
        setMovieDetails(res.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }
    fetchMovieDetails();
  });

  return (
    <div className="movie-detail-container">
      {movieDetails ? (
        <>
          {movieDetails.poster_path && (
            <div className="movie-detail-image">
              <img
                src={`${IMAGE_BASE_URL}${movieDetails.poster_path}`}
                alt={movieDetails.original_title}
              />
            </div>
          )}
          <div className="movie-detail-info">
            <h1 className="movie-detail-title" style={{color:"white"}}>{movieDetails.original_title}</h1>
            <p className="movie-detail-overview" style={{color:"white"}} >{movieDetails.overview}</p>
            <p className="movie-detail-meta">
              <strong>Release Date:</strong> {movieDetails.release_date}
            </p>
            <p className="movie-detail-meta">
              <strong>Rating:</strong> {movieDetails.vote_average}
            </p>
          </div>
        </>
      ) : (
        <p style={{color:"white"}}>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetail;
