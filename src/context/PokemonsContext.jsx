import { createContext, useState } from 'react';
import { useFetchPokemon } from '../hooks/useFechtPokemon';
// import { useSearch } from "../hooks/useSearch";
import { useSort } from '../hooks/useSort';

export const PokemonsContext = createContext();

export function PokemonsProvider({ children }) {
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(0);
  const [offset, setOffset] = useState(0);

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
  } = useFetchPokemon({search,limit,offset});
  
  // const { updateSearch, setUpdateSearch, error } = useSearch(search);

  //Automatic search when typing
  const filteredPokemon = mappedPokemons.filter((pokemon) =>
    pokemon.name.includes(search)
  );


  // console.log({ filteredPokemon, mappedPokemons, search });
  const { sortedPokemons, setSortSelection } = useSort(filteredPokemon);

  return (
    <PokemonsContext.Provider
      value={{
        // Local State
        search,
        setSearch,
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
