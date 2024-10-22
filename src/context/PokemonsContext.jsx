import { createContext, useState } from 'react';
import { useFetchPokemon } from '../hooks/useFechtPokemon';
import { useSort } from '../hooks/useSort';
import { useLocation } from 'react-router-dom';


export const PokemonsContext = createContext();

export function PokemonsProvider({ children }) {
  const MINIMUM_POKEMONS_FOR_LOAD_MORE = 18;
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(18);
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
  console.log('filteredPokemon', filteredPokemon);

 
  const hasFilteredTypes = selectedTypes.length > 0;

  const finalPokemons = hasFilteredTypes ? filteredTypes : filteredPokemon;

  // Sort Pokemons
  const { sortedPokemons, setSortSelection } = useSort(finalPokemons);
  // console.log('sortedPokemons: ', sortedPokemons);

  // Load More Click
  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + MINIMUM_POKEMONS_FOR_LOAD_MORE);
  };

  const resetApp = () => {
    console.log('resetApp: ');
    setSearch('');
    setLimit(18);
    setOffset(0);
    setSelectedTypes([]);
    setResponsePokemons([]);
    getPokemons(limit, offset, true);
 
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
