import { useEffect } from 'react';
import { Pokemons } from './components/Pokemons';
import { Header } from './components/UI/Header';
import { usePokemons } from './components/hooks/usePokemons';
import { PokemonsProvider } from './context/Pokemon';
import { Button } from './components/UI/Button';


function App() {
  const search = '18';
  const { pokemons: mappedPokemons, getAllPokemons, getSearchedPokemons } = usePokemons({ search });
  

  useEffect(() => {
    getAllPokemons();
    // getSearchedPokemons({ search });
  }, []);
  
  return (
    <PokemonsProvider>
      <Header />
      {/* <DropFilter /> */}
      <Pokemons pokemons={mappedPokemons} />
      {mappedPokemons.length >= 50 && <Button type='more' />}
    </PokemonsProvider>
  );
}

export default App;
