import { NUMBER_OF_POKEMONS_FOR_LOAD_MORE } from '../constants.jsx';
import { useCallback, useEffect, useRef, useState } from 'react';

const POKEMONS_TYPES_ENDPOINT = `https://pokeapi.co/api/v2/type/`;
const POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon`;
const SEARCHED_POKEMON_ENDPOINT = `https://pokeapi.co/api/v2/pokemon/`;

export const useFetchPokemon = ({ search, limit, offset}) => {
  const [responsePokemons, setResponsePokemons] = useState([]);
  const [pokemonDescription, setPokemonDescription] = useState([]);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingEvolutions, setLoadingEvolutions] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const previousSearch = useRef({ search });
  const previousLimit = useRef({ limit });
  const previousOffset = useRef({ offset });
  const previousEvoChain = useRef([]);

  const getPokemonsTypes = useCallback(() => {
    setLoading(true);
    setFetchError(null);
    previousSearch.current = search;
    fetch(`${POKEMONS_TYPES_ENDPOINT}`)
      .then((res) => res.json())
      .then((data) => {
        const typeNames = data.results.map((pokemon) => pokemon.name);
        setTypes(typeNames);
      })
      .catch((error) => {
        setFetchError(error.message);
        setTypes([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getPokemons = useCallback(
    (limit = NUMBER_OF_POKEMONS_FOR_LOAD_MORE, offset = 0, forceReload = false) => {
      if (
        !forceReload &&
        limit === previousLimit.current &&
        offset === previousOffset.current
      ) {
        return;
      }

      setLoading(true);
      setFetchError(null);

      previousLimit.current = limit;
      previousOffset.current = offset;

      fetch(`${POKEMON_ENDPOINT}?limit=${limit}&offset=${offset}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error in the server response: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.results.length === 0) {
            throw new Error('No pokemon found');  
          }
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
              setFetchError(error.message);
            });
        })
        .catch((error) => {
          setFetchError(error.message);
          setResponsePokemons([]);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    []
  );

  const getSearchedPokemons = useCallback(({ search }) => {
    if (search === '' || search === previousSearch.current)
      return 

    setLoading(true);
    setFetchError(null);

    previousSearch.current = search;

    fetch(`${SEARCHED_POKEMON_ENDPOINT}${search}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} - Pokémon not found`);
        }
        return res.json();
      })
      .then((data) => {
        setResponsePokemons([data]);
      })
      .catch((error) => {
        setFetchError(error.message);
        setResponsePokemons([]);
      })
      .finally(() => {
        setLoading(false);
      });
      
  }, []);

  const getEvolutionChain = useCallback(({ evolutionChain }) => {
    if (evolutionChain === '' || evolutionChain === previousEvoChain.current) {
      return;
    }

    setLoadingEvolutions(true);
    setFetchError(null);

    previousEvoChain.current = evolutionChain;

    fetch(`${evolutionChain}`)
      .then((res) => res.json())
      .then((speciesData) => {
        const englishFlavorText = speciesData.flavor_text_entries.find(
          (text) => text.language.name === 'en'
        );
        const flavorText = englishFlavorText
          ? englishFlavorText.flavor_text
          : null;

        setPokemonDescription({
          flavorText: flavorText,
          habitat: speciesData.habitat ? speciesData.habitat.name : null,
        });
        const evolutionChainUrl = speciesData.evolution_chain.url;
        return fetch(evolutionChainUrl);
      })
        .then((resChain) => resChain.json())
        .then((evolutionData) => {
          return processEvolutionChain(evolutionData.chain); 
        })
          .then((sortedChain) => {
            setEvolutionChain(sortedChain); 
          })
      .catch((error) => {
        setFetchError(error.message);
        setResponsePokemons([]); 
      })
      .finally(() => {
        setLoadingEvolutions(false); 
      });

  }, []);

  
  const getEvolutionImage = useCallback(async (pokemonName) => {

    setLoading(true);
    setFetchError(null);

    try {
      const response = await fetch(`${SEARCHED_POKEMON_ENDPOINT}${pokemonName}`);
      const data = await response.json();

      return {
        evolutionID: data.id,
        defaultImage: data.sprites.other.dream_world.front_default,
        secondaryImage: data.sprites.other['official-artwork'].front_default,
      };
    } catch (error) {
      setFetchError(error.message);
      return { defaultImage: null, secondaryImage: null };
    } finally {
      setLoading(false);
    }

  }, []);

  const processEvolutionChain = async (data) => {
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
    habitat: pokemonDescription.habitat, 
    flavorText: pokemonDescription.flavorText, 
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
    loadingEvolutions,
    setLoadingEvolutions,
    fetchError,
    setFetchError
  };
};
