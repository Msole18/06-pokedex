import { Header } from '../components/UI/Header';
import { Pokemons } from '../components/Pokemons';
import { useState } from 'react';


export function HomePage() {
  const [filtersHeight, setFiltersHeight] = useState(0);

  return (
    <>
      <Header setFiltersHeight={setFiltersHeight} />
      <Pokemons filtersHeight={filtersHeight} />
    </>
  );
}

