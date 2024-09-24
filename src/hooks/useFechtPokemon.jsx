import { useCallback, useEffect, useRef, useState } from 'react';

const POKEMONS_TYPES_ENDPOINT = `https://pokeapi.co/api/v2/type/`;
const POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon`;
const SEARCHED_POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/`;

export const useFetchPokemon = ({ search, limit, offset}) => {
  const [responsePokemons, setResponsePokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef({ search });
  const previousLimit = useRef({limit});
  const previousOffset = useRef({offset});
  
  
  
  const getPokemons = useCallback((limit = 20, offset = 0) => {
    console.log('getPokemons: ');
    console.log('getPokemons: ', {limit, offset});
    if (limit === previousLimit.current && offset === previousOffset.current) {
      return console.log('me agarro el if'); // No hacer nada si son iguales
    }  
    setLoading(true);
    setError(null);
    previousLimit.current = limit; 
    previousOffset.current = offset; 
    fetch(`${POKEMON_ENDPOINT}?limit=${limit}&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        data.results.map((pokemon) => {
          fetch(pokemon.url)
            .then((res) => res.json())
            .then((response) => {
              setResponsePokemons((prevState) => {
                return [...prevState, response];
              });
            })
            .catch((error) => {
              console.error('Error fetching individual pokemon:', error);
              setError(error.message);
            });
        });
      })
      .catch((error) => {
        console.error('Error in fetching pokemons list:', error);
        setError(error.message);
        setResponsePokemons([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  const getSearchedPokemons = useCallback(({ search }) => {
    if (search === '' || search === previousSearch.current) return;

    setLoading(true);
    setError(null);
    previousSearch.current = search;
    fetch(`${SEARCHED_POKEMON_ENDPOINT}${search}`)
      .then((res) => res.json())
      .then((data) => {
        setResponsePokemons([data]);
      })
      .catch((error) => {
        console.error('Error in fetching pokemons:', error);
        setError(error.message);
        setResponsePokemons([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

   const getPokemonsTypes = () => {
     setLoading(true);
     setError(null);
     previousSearch.current = search;
     fetch(`${POKEMONS_TYPES_ENDPOINT}`)
       .then((res) => res.json())
       .then((data) => {
         const typeNames = data.results.map((pokemon) => pokemon.name);
         setTypes(typeNames);
       })
       .catch((error) => {
         console.error('Error in fetching pokemons:', error);
         setError(error.message);
         setTypes([]);
       })
       .finally(() => {
         setLoading(false);
       });
   };


  const uniquePokemons = Array
    .from( new Set(responsePokemons.map((p) => p.id)))
    .map((id) => responsePokemons.find((pokemon) => pokemon.id === id));

  const mappedPokemons = uniquePokemons?.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    defaultImage: pokemon.sprites.other.dream_world.front_default,
    secondaryImage: pokemon.sprites.other['official-artwork'].front_default,
    type: pokemon.types
  }));

  useEffect(() => { 
    getPokemonsTypes();
  }, []);

  useEffect(() => {
    getPokemons(limit, offset);
  }, [limit, offset]);

  return {
    responsePokemons, setResponsePokemons,
    pokemons: mappedPokemons,
    getPokemonsTypes,
    getPokemons,
    getSearchedPokemons,
    types,
    setTypes,
    loading,
    error,
  };
};
