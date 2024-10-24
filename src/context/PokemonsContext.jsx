import { createContext, useState } from 'react';
import { useFetchPokemon } from '../hooks/useFechtPokemon';
import { useSort } from '../hooks/useSort';
import { useLocation } from 'react-router-dom';

export const MINIMUM_POKEMONS_FOR_LOAD_MORE = 1;
export const MAXIMUM_POKEMONS_FOR_LOAD_MORE = 1000;
export const NUMBER_OF_POKEMONS_FOR_LOAD_MORE = 18;

export const PokemonsContext = createContext();

export function PokemonsProvider({ children }) {
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(NUMBER_OF_POKEMONS_FOR_LOAD_MORE);
  const [offset, setOffset] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filtersHeight, setFiltersHeight] = useState(0);
 
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const {
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
    fetchError,
    setFetchError
  } = useFetchPokemon({ search, limit, offset });

  const filteredTypes = mappedPokemons.filter((pokemon) =>
    pokemon.type.some((typeObj) => selectedTypes.includes(typeObj.type.name))
  );
 
  //Automatic search when typing
  const filteredPokemon =
    isHomePage && search
      ? mappedPokemons.filter(
          (pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
            pokemon.id.toString().includes(search)
        )
      : mappedPokemons;
 
  const hasFilteredTypes = selectedTypes.length > 0;

  const finalPokemons = hasFilteredTypes ? filteredTypes : filteredPokemon;

  // Sort Pokemons
  const { sortedPokemons, setSortSelection } = useSort(finalPokemons);
 

  // Load More Click
  const handleLoadMore = () => {
    setOffset((prevOffset) => {
      // Get the ID of the last loaded Pokémon
      const lastPokemonId = finalPokemons.length > 0 ? finalPokemons[finalPokemons.length - 1].id : 0;

      // Calculate how many Pokémon can be loaded without exceeding the maximum ID allowed (MAXIMUM_POKEMONS_FOR_LOAD_MORE).
      const remainingPokemonsToMax = MAXIMUM_POKEMONS_FOR_LOAD_MORE - lastPokemonId;

      // Determine how many Pokémon will be loaded, respecting the maximum limit.
      const numberOfPokemonsToLoad = Math.min(NUMBER_OF_POKEMONS_FOR_LOAD_MORE, remainingPokemonsToMax);

      // Increase offset
      const newOffset = prevOffset + numberOfPokemonsToLoad;

      // Ensure that we do not exceed the maximum allowance
      return newOffset <= MAXIMUM_POKEMONS_FOR_LOAD_MORE ? newOffset : prevOffset;
    });
  };

  const resetApp = () => {
    setSearch('');
    setLimit(18);
    setOffset(0);
    setSelectedTypes([]);
    setResponsePokemons([]);
    setFetchError(null)

    getPokemons(18, 0, true);
  };

  return (
    <PokemonsContext.Provider
      value={{
        // Local
        search,
        setSearch,
        selectedTypes,
        setSelectedTypes,
        handleLoadMore,
        MINIMUM_POKEMONS_FOR_LOAD_MORE,
        MAXIMUM_POKEMONS_FOR_LOAD_MORE,
        // useFetchPokemon
        responsePokemons,
        setResponsePokemons,
        pokemons: mappedPokemons,
        getPokemonsTypes,
        getPokemons,
        getSearchedPokemons,
        getEvolutionChain,
        types,
        setTypes,
        limit,
        setLimit,
        offset,
        setOffset,
        loading,
        fetchError,
        finalPokemons,
        sortedPokemons,
        setSortSelection,
        // FiltersPanel
        filtersHeight,
        setFiltersHeight,
        resetApp,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
}
