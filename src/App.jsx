import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Imge from "./imge";   
import MovieDetail from "./MovieDetail";  
 
function App() {
  return (

    <Router>
 
      <Routes>
        <Route path="/" element={<Imge />} />
        <Route path="/movie/:id" element={<MovieDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;
