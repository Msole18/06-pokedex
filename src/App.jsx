import './App.css';
import pokeLogo from './assets/pokemon-logo.svg';
import { useState, useEffect } from 'react';

const POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`;
// const SEARCHED_POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`;

function App() {
  const [pokemons, setPokemons] = useState('');
    

  useEffect(() => {
    fetch(POKEMON_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        //Here we recive an object that has an array inside with the name and de url of the first pokemons
        data.results.map((pokemon) => {
          fetch(pokemon.url)
            .then((res) => res.json())
            .then((response) => {
              // Here we were tha invidivual object of any pokemon in the previus fetch
              console.log('responde: ', response);
              const  url  = response;
              setPokemons(url);
            });
        });
      });
  }, []);

  return (
    <div className='page'>
      <header>
        <img
          src={pokeLogo}
          alt='pokemon logo'
        />
        <form className='form'>
          <input
            type='text'
            placeholder='Pikachu, 18, Charizar...'
          />
          <button type='submit'>Search</button>
        </form>
      </header>

      <main>
        
          <h1>POKEDEX HERE</h1>
        
      </main>
    </div>
  );
}

export default App;
