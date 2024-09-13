import { createContext, useState } from "react"

export const PokemonsContext = createContext();

export function PokemonsProvider ({ children }) {
  const [pokemons, setpokemons] = useState([])

   return (
     <PokemonsContext.Provider value={{
      pokemons,
      setpokemons
     }}>{children}</PokemonsContext.Provider>
   );

}