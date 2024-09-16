import { createContext, useState } from "react"
import { usePokemons } from "../hooks/usePokemons";
import { useSearch } from "../hooks/useSearch";

export const PokemonsContext = createContext();

export function PokemonsProvider ({ children }) {
  const [search, setSearch] = useState('');

  const {
    pokemons: mappedPokemons,
    getAllPokemons,
    getSearchedPokemons,
  } = usePokemons();

  const { updateSearch, setUpdateSearch, error } = useSearch();

   return (
     <PokemonsContext.Provider
       value={{
         search,
         setSearch,
         pokemons: mappedPokemons,
         getAllPokemons,
         getSearchedPokemons,
         updateSearch,
         setUpdateSearch,
         error,
       }}
     >
       {children}
     </PokemonsContext.Provider>
   );

}