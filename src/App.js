import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [pesquisa, setPesquisa] = useState('');

  const handleClick = () => {
    console.log('click')
    fetch(`http://www.omdbapi.com/?s=${pesquisa}&apikey=b13e933d`)
      .then(response => response.json())
      .then(json => setMovies(json.Search))
  }

  return (
    <>
    <center>
        <h1>FILMES</h1>
        <input onChange={event => setPesquisa(event.target.value)}/>
        <button onClick={() => handleClick()}>Pesquisar</button>
        <span>
          {movies && movies.map(movie => {
            return(
              <div key={movie.imdbID}>
                <h2>{movie.Title} - {movie.Year}</h2>
                <img border="0" src={movie.Poster}></img>
                {/*<br/>
                {movie.favorite && <span>Favorito</span>}
                <button onClick={() => handleClick(movie.imdbID)}>Favoritar</button>*/}
              </div>
            );
          })}
        </span>
     </center>
    </>
  );
}

export default App;
