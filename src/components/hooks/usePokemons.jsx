import { useState, useEffect } from "react";
const POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12`;
// const SEARCHED_POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`;

export function usePokemons () {
  const [responsePokemons, setResponsePokemons] = useState([]);

 
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
              setResponsePokemons((prevState) => {
                return [...prevState, response];
              });
            });
        });
      });
  }, []);
  
  const mappedPokemons = responsePokemons?.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other.dream_world.front_default,
    type: pokemon.types,
  }));

  const getPokemons = () => {
    if (search) {
      setResponsePokemons(responsePokemons);
    } else {
      console.log('pelando bola')
    }

  }
  return {pokemons: mappedPokemons}
}