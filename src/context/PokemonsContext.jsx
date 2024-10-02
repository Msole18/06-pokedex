import { createContext, useState } from 'react';
import { useFetchPokemon } from '../hooks/useFechtPokemon';
import { useSort } from '../hooks/useSort';


export const PokemonsContext = createContext();

export function PokemonsProvider({ children }) {
  const MINIMUM_POKEMONS_FOR_LOAD_MORE = 18;
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(18);
  const [offset, setOffset] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const {
    responsePokemons,
    setResponsePokemons,
    pokemons: mappedPokemons,
    getPokemonsTypes,
    getPokemons,
    getSearchedPokemons,
    types,
    setTypes,
    loading,
    error,
  } = useFetchPokemon({ search, limit, offset });

  // Load More Click
  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + MINIMUM_POKEMONS_FOR_LOAD_MORE);
    setResponsePokemons((prevPokemons) => [...prevPokemons, ...mappedPokemons]);
  };
  const filteredTypes = mappedPokemons.filter((pokemon) =>
    pokemon.type.some((typeObj) => selectedTypes.includes(typeObj.type.name))
  );

  //Automatic search when typing
  const filteredPokemon = search
    ? mappedPokemons.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(search.toLowerCase())||
          pokemon.id.toString().includes(search)
      )
    : mappedPokemons;

  const hasFilteredTypes = selectedTypes.length > 0;
  const finalPokemons = hasFilteredTypes ? filteredTypes : filteredPokemon;
  // console.log({ filteredPokemon });
  const { sortedPokemons, setSortSelection } = useSort(finalPokemons);

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
        types,
        setTypes,
        limit,
        setLimit,
        offset,
        setOffset,
        loading,
        error,
        sortedPokemons,
        setSortSelection,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
}
