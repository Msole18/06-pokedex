import { useCallback, useState } from 'react';
const POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon`;
const SEARCHED_POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/`;

export const usePokemons = () => {
  const [responsePokemons, setResponsePokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  const getAllPokemons = (limit = 50) => {
    setResponsePokemons([])
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
              console.error('Error in fetching pokemons:', error);
              return { pokemons: [] };
            });
        });
      });
  };

  const getSearchedPokemons = ({search}) => {
    console.log('search: ', search)
    if (search === '') return null;
    fetch(`${SEARCHED_POKEMON_ENDPOINT}${search}`)
      .then((res) => res.json())
      .then((data) => {
        // setResponsePokemons((prevState) => {
        //   return [...prevState,data];
        // });
        setResponsePokemons([data]);
      })
      .catch((error) => {
        console.error('Error in fetching pokemons:', error);
        return { pokemons: [] };
      });
  };

  // const getPokemons = useCallback(async (search) => {
  //   if (search === previousSearch.current) return;
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     previousSearch.current = search;
  //     const newPokemons = await searchPokemon( search );
  //     setPokemons(newPokemons);
  //   } catch (e) {
  //     setError(e.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const mappedPokemons = responsePokemons
    ?.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      defaultImage: pokemon.sprites.other.dream_world.front_default,
      secondaryImage: pokemon.sprites.other['official-artwork'].front_default,
      type: pokemon.types,
    }))
    .sort((a, b) => a.id - b.id);

  return { pokemons: mappedPokemons, getAllPokemons, getSearchedPokemons };
};
