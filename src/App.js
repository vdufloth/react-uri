import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [favoritos, setFavoritos] = useState([])
  const [pesquisa, setPesquisa] = useState('');

  const handleClick = () => {
    console.log('click')
    fetch(`http://www.omdbapi.com/?s=${pesquisa}&apikey=b13e933d`)
      .then(response => response.json())
      .then(json => setMovies(json.Search))
  }

  const favoriteClick = (id) => {
    console.log(id);
    const newMovies 
      = movies.map(movie => {
        return movie.imdbID === id ? {...movie, favorite: !movie.favorite} : movie;
      });
    const favoritados = newMovies.filter(movie => movie.favorite);
    setFavoritos(favoritados);
    setMovies(newMovies);
  }

  return (
    <center>
        <h1>FAVORITADOS</h1>
        {favoritos && favoritos.map(favorito => {
            return(
              <div key={favorito.imdbID}>
                <div>{favorito.Title} - {favorito.Year}</div>
                <img border="0" width="100" src={favorito.Poster}></img>
              </div>
            );
          })}
        <br/>
        <h1>FILMES</h1>
        <input onChange={event => setPesquisa(event.target.value)}/>
        <button onClick={() => handleClick()}>Pesquisar</button>
        <span>
          {movies && movies.map(movie => {
            return(
              <div key={movie.imdbID}>
                <h2>{movie.Title} - {movie.Year}</h2>
                <img border="0" src={movie.Poster}></img>
                <button onClick={() => favoriteClick(movie.imdbID)}>
                  {!movie.favorite && <div>Favoritar</div>}
                  {movie.favorite && <div>Desfavoritar</div>}                
                  </button>
              </div>
            );
          })}
        </span>
     </center>
  );
}

export default App;

