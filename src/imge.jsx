import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";      
import { CiSearch } from "react-icons/ci";

function Imge() {
  const [movies, setMovies] = useState([]);  
  const [serch, setSerch] = useState("");
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const API_KEY = "aaa6b836a431ce9f39a420fbf5358806";
  const navigates = useNavigate(); 

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      setMovies(res.data.results); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleSearch = (e) => {
    setSerch(e.target.value);
  };

  const handleMovieClick = (id) => {
    navigates(`/movie/${id}`);
  };

  const filteredMovies = serch
    ? movies.filter(movie =>
        movie.original_title.toLowerCase().includes(serch.toLowerCase())
      ).slice(0, 4)
    : []; 

  const handleSearchIconClick = () => {
    if (filteredMovies.length > 0) {
      handleMovieClick(filteredMovies[0].id); // نقلك إلى صفحة الوصف لأولى نتائج البحث
    }
  };

  return (
    <div>
        <div className="conten">
    <div style={{display:"flex", justifyContent:"center"}}>  
      <input
        id="serch"
        type="text"
        placeholder="Search for a movie..."
        value={serch}
        onChange={handleSearch}
      />
      <CiSearch 
      className="ss"
        style={{
          display:"flex", 
          justifyItems:"center", 
          marginTop:"20px",
          width:"21px", 
          height:"20px", 
          color:"white", 
          cursor: "pointer"
        }}
        onClick={handleSearchIconClick} // التعامل مع النقر على الأيقونة
      />
    </div>

      {/* 🔹 قائمة البحث (يتم التوجيه عند النقر على أي فيلم) */}
      {filteredMovies.length > 0 && (
        <ul>
            <br />
           {filteredMovies.map((movie) => (
            <li 
              key={movie.id} 
              onClick={() => handleMovieClick(movie.id)} // 🔹 التنقل عند النقر
              style={{ cursor: "pointer" }} // 🔹 تحسين المظهر
            >
              {movie.original_title}
            </li>
          ))}
          <br />
        </ul>
      )}
      </div>

      {/* عرض الأفلام */}
      <div className="imgess">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={`Movie ${movie.original_title}`}
              onClick={() => handleMovieClick(movie.id)}
              style={{cursor:"pointer"}}
            />
            {movie.original_title && <h3 style={{color:"white"}}>{movie.original_title}</h3>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Imge; 
