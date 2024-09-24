import { createContext, useState } from 'react';
import { useFetchPokemon } from '../hooks/useFechtPokemon';
// import { useSearch } from "../hooks/useSearch";
import { useSort } from '../hooks/useSort';

export const PokemonsContext = createContext();

export function PokemonsProvider({ children }) {
  const [search, setSearch] = useState('');
  const [limit, setLimit] = useState(0);
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

  // const { updateSearch, setUpdateSearch, error } = useSearch(search);

  //Automatic search when typing
  // Función para filtrar Pokémon por tipos seleccionados
  const filteredTypes = mappedPokemons.filter((pokemon) =>
    pokemon.type.some((typeObj) => selectedTypes.includes(typeObj.type.name))
  );

  const filteredPokemon = search
    ? mappedPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      )
    : mappedPokemons;

  const hasFilteredTypes = selectedTypes.length > 0;
  const finalPokemons = hasFilteredTypes ? filteredTypes : filteredPokemon;

  console.log({ selectedTypes, filteredTypes, finalPokemons });

  const { sortedPokemons, setSortSelection } = useSort(finalPokemons);

  return (
    <PokemonsContext.Provider
      value={{
        // Local State
        search,
        setSearch,
        selectedTypes,
        setSelectedTypes,
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
