import { useMemo, useState } from "react";

export function useSort(pokemons) {
  console.log('useSort')
  const [sortSelection, setSortSelection] = useState('increaseId');

  const sortedPokemons = useMemo(() => {
    const pokemonsCopy = [...pokemons];

    if (sortSelection === 'increaseId') {
      return pokemonsCopy.sort((a, b) => a.id - b.id);
    }

    if (sortSelection === 'decreaseId') {
      return pokemonsCopy.sort((a, b) => b.id - a.id);
    }

    if (sortSelection === 'increaseName') {
      return pokemonsCopy.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortSelection === 'decreaseName') {
      return pokemonsCopy.sort((a, b) => b.name.localeCompare(a.name));
    }

    // Default case: Number: Low to High
    return pokemonsCopy.sort((a, b) => b.id - a.id);
  }, [pokemons, sortSelection]);

  return { sortedPokemons, setSortSelection };
}