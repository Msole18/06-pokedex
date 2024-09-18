import { createContext, useState } from "react"
import { usePokemons } from "../hooks/usePokemons";
import { useSearch } from "../hooks/useSearch";
import { useSort } from "../hooks/useSort";

export const PokemonsContext = createContext();

export function PokemonsProvider ({ children }) {
  const [search, setSearch] = useState('');

  const {
    pokemons: mappedPokemons,
    getPokemons,
    getAllPokemons,
    getSearchedPokemons,
    limit, offset,
    loading,
  } = usePokemons(search);

  const { updateSearch, setUpdateSearch, error } = useSearch(search);
  const { sortedPokemons, setSortSelection } = useSort(mappedPokemons);

   return (
     <PokemonsContext.Provider
       value={{
         // Local State
         search,
         setSearch,
         // usePokemons
         pokemons: mappedPokemons,
         getPokemons,
         getAllPokemons,
         getSearchedPokemons,
         limit,
         offset,
         loading,
         // useSearch
         updateSearch,
         setUpdateSearch,
         error,
         // useSort
         sortedPokemons,
         setSortSelection,
       }}
     >
       {children}
     </PokemonsContext.Provider>
   );

}