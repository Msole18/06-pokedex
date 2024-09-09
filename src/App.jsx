import { Pokemons } from './components/Pokemons';
import { Header } from './components/Header';
import { usePokemons } from './components/hooks/usePokemons';



function App() {
  const { pokemons: mappedPokemons} = usePokemons()

  
  
  return (
    <>
      <Header />
      {/* <DropFilter /> */}
      <Pokemons pokemons={mappedPokemons} />
    </>
  );
}

export default App;
