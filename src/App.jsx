import classes from './App.module.css';
import { Header } from './components/UI/Header';
import { Pokemons } from './components/Pokemons';
import { PokemonsProvider } from './context/PokemonsContext';

function App() {

  return (
    <div className={classes.app}>
      <PokemonsProvider>
        <Header />
        <Pokemons />
      </PokemonsProvider>
    </div>
  );
}

export default App;
