import { useCallback, useEffect, useRef, useState } from 'react';

const POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon`;
const SEARCHED_POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/`;

export const usePokemons = ({ search  }) => {
  const [responsePokemons, setResponsePokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(0);
  const previousSearch = useRef({ search });

  const getPokemons = (limit = 50) => {
     setLoading(true);
     setError(null);
     fetch(`${POKEMON_ENDPOINT}?limit=${limit}&offset=${offset}`)
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
  };

  const getAllPokemons = (limit = 100000, offset = 0) => {
    setLoading(true);
    setError(null);
    fetch(`${POKEMON_ENDPOINT}?limit=${limit}&offset=${offset}`)
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
  };

  const getSearchedPokemons = useCallback(({ search }) => {
    if (search === '' || search === previousSearch.current) return; // impide que se busque lo mismo 2 veces
    setLoading(true);
    setError(null);
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

  useEffect(() =>{
    getPokemons();
  },[limit, offset])


  const mappedPokemons = responsePokemons?.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    defaultImage: pokemon.sprites.other.dream_world.front_default,
    secondaryImage: pokemon.sprites.other['official-artwork'].front_default,
    type: pokemon.types,
  }));
  
  return {
    pokemons: mappedPokemons,
    getPokemons,
    getAllPokemons,
    getSearchedPokemons,
    limit,
    setLimit,
    offset,
    setOffset,
    loading,
    error,
    search,
  };
};
