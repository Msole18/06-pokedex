import { useMemo, useState } from "react";

export function useSort(pokemons = []) {
  const [sortSelection, setSortSelection] = useState('increaseId');

  const sortedPokemons = useMemo(() => {
    const pokemonsCopy = [...pokemons];
    //Number: Low to High
    if (sortSelection === 'increaseId') {
      return pokemonsCopy.sort((a, b) => a.id - b.id);
    }
    //Number: High to Low
    if (sortSelection === 'decreaseId') {
      return pokemonsCopy.sort((a, b) => b.id - a.id);
    }
    //Name: A-Z
    if (sortSelection === 'increaseName') {
      return pokemonsCopy.sort((a, b) => a.name.localeCompare(b.name));
    }
    //Name: Z-A
    if (sortSelection === 'decreaseName') {
      return pokemonsCopy.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Default case: Number: Low to High
    return pokemonsCopy.sort((a, b) => b.id - a.id);
  }, [pokemons, sortSelection]);

  return { sortedPokemons, setSortSelection };
}