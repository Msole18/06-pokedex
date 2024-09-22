import { createContext, useState } from 'react';
import { useFetchPokemon } from '../hooks/useFechtPokemon';
// import { useSearch } from "../hooks/useSearch";
import { useSort } from '../hooks/useSort';

export const PokemonsContext = createContext();

export function PokemonsProvider({ children }) {
  const [search, setSearch] = useState('');

  const {
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
  } = useFetchPokemon(search);
  
  // const { updateSearch, setUpdateSearch, error } = useSearch(search);

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
