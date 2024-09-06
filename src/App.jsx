import './App.module.css';
import { useState, useEffect } from 'react';
import { Pokemons } from './components/Pokemons';
import { Header } from './components/Header';

const POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12`;
// const SEARCHED_POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`;

function App() {
  const [initialPokemons, setInitialPokemons] = useState([]);

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
              setInitialPokemons(prevState => { 
                return [...prevState, response]; 
              });
            });
        });
      });
  }, []);


  return (
    <div className='page'>
      <Header />

      <main>
        <Pokemons pokemons={initialPokemons} />
      </main>
    </div>
  );
}

export default App;
