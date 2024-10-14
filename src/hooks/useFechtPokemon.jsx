/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react';

const POKEMONS_TYPES_ENDPOINT = `https://pokeapi.co/api/v2/type/`;
const POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon`;
const SEARCHED_POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/`;

export const useFetchPokemon = ({ search, limit, offset}) => {
  const [responsePokemons, setResponsePokemons] = useState([]);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef({ search });
  const previousLimit = useRef({ limit });
  const previousOffset = useRef({ offset });
  const previousEvoChain = useRef('');

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

  const getPokemons = useCallback(
    (limit = 18, offset = 0, forceReload = false) => {
      if (
        !forceReload &&
        limit === previousLimit.current &&
        offset === previousOffset.current
      ) {
        return;
      }

      setLoading(true);
      setError(null);

      previousLimit.current = limit;
      previousOffset.current = offset;

      fetch(`${POKEMON_ENDPOINT}?limit=${limit}&offset=${offset}`)
        .then((res) => res.json())
        .then((data) => {
          const pokemonPromises = data.results.map((pokemon) =>
            fetch(pokemon.url).then((res) => res.json())
          );
          // We wait for all individual fetches to finish before updating the status.
          Promise.all(pokemonPromises)
            .then((pokemons) => {
              setResponsePokemons((prevState) => {
                // Avoid duplicates, before updating the status
                const uniquePokemons = pokemons.filter(
                  (newPokemon) =>
                    !prevState.some(
                      (prevPokemon) => prevPokemon.id === newPokemon.id
                    )
                );
                return [...prevState, ...uniquePokemons];
              });
            })
            .catch((error) => {
              console.error('Error fetching individual pokemons:', error);
              setError(error.message);
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
    },
    []
  );

  const getSearchedPokemons = useCallback(({ search }) => {
    // console.log('getSearchedPokemons');
    if (search === '' || search === previousSearch.current)
      return console.log('return getSearchedPokemons');

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

  // const getEvolutionChain = useCallback(({ evolutionChain }) => {
  //   // console.log('getEvolutionChain', evolutionChain);
  //   if (evolutionChain === '' || evolutionChain === previousEvoChain.current)
  //     return; //console.log('return getEvolutionChain');

  //   setLoading(true);
  //   setError(null);

  //   previousEvoChain.current = evolutionChain;

  //   fetch(`${evolutionChain}`)
  //     .then((res) => res.json())
  //     .then((speciesData) => {
  //       const evolutionChainUrl = speciesData.evolution_chain.url;
  //       return fetch(evolutionChainUrl);
  //     })
  //       .then((res) => res.json())
  //       .then((evolutionData) => {
  //         // console.log('Evolution Chain Data:', evolutionData.chain);
  //         const sortedChain = processEvolutionChain(evolutionData.chain);
  //         // console.log('sortedChain:', sortedChain);
  //         return setEvolutionChain(sortedChain);
  //       })
  //     .catch((error) => {
  //       console.error('Error in fetching pokemons:', error);
  //       setError(error.message);
  //       setResponsePokemons([]);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);
  const getEvolutionChain = useCallback(({ evolutionChain }) => {
    if (evolutionChain === '' || evolutionChain === previousEvoChain.current) {
      return;
    }

    setLoading(true);
    setError(null);

    previousEvoChain.current = evolutionChain;

    fetch(`${evolutionChain}`)
      .then((res) => res.json())
      .then((speciesData) => {
        const evolutionChainUrl = speciesData.evolution_chain.url;
        return fetch(evolutionChainUrl);
      })
      .then((resChain) => resChain.json())
      .then((evolutionData) => {
        return processEvolutionChain(evolutionData.chain); // Este sigue siendo el problema
      })
      .then((sortedChain) => {
        setEvolutionChain(sortedChain); // Asegúrate de que el resultado de `processEvolutionChain` se pase a setEvolutionChain
      })
      .catch((error) => {
        console.error('Error in fetching pokemons:', error);
        setError(error.message);
        setResponsePokemons([]); // Limpiar en caso de error
      })
      .finally(() => {
        setLoading(false); // Detener el loading
      });
  }, []);

  
  const getEvolutionImage = useCallback(async (pokemonName) => {

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${SEARCHED_POKEMON_ENDPOINT}${pokemonName}`);
      const data = await response.json();

      return {
        defaultImage: data.sprites.other.dream_world.front_default,
        secondaryImage: data.sprites.other['official-artwork'].front_default,
      };
    } catch (error) {
      console.error('Error in fetching pokemons:', error);
      setError(error.message);
      return { defaultImage: null, secondaryImage: null }; // Devuelve valores nulos en caso de error
    } finally {
      setLoading(false);
    }
  }, []);

  const processEvolutionChain = async (data) => {
    console.log('processEvolutionChain:');
    const evolutions = [];

    const processSpecies = async (data) => {
      if (!data) return;

      // Get the image asynchronously
      const images = await getEvolutionImage(data.species.name);

      // Adds the current species to the array with images
      evolutions.push({
        name: data.species.name,
        url: data.species.url,
        ...images, // Add images (defaultImage and secondaryImage)
      });

      // Use map to process all evolutions in "evolves_to" in parallel
      const promises = data.evolves_to.map((evolution) =>
        processSpecies(evolution)
      );
      await Promise.all(promises); // Wait for all promises to be resolved
    };

    // Starts processing from the first element in the chain
    await processSpecies(data);

    // We return the evolutions arrangement with images.
    return evolutions;
  };

  const mappedPokemons = responsePokemons?.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    defaultImage: pokemon.sprites.other.dream_world.front_default,
    secondaryImage: pokemon.sprites.other['official-artwork'].front_default,
    type: pokemon.types,
    height: pokemon.height,
    weight: pokemon.weight,
    stats: pokemon.stats,
    abilities: pokemon.abilities,
    speciesUrl: pokemon.species.url,
    evolutions: evolutionChain,
  }));

  useEffect(() => {
    getPokemonsTypes();
  }, []);

  useEffect(() => {
    getPokemons(limit, offset);
  }, [limit, offset, getPokemons]);

  return {
    responsePokemons,
    setResponsePokemons,
    pokemons: mappedPokemons,
    getPokemonsTypes,
    getPokemons,
    getSearchedPokemons,
    getEvolutionChain,
    types,
    setTypes,
    loading,
    error,
  };
};
