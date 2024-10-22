import { Header } from '../components/UI/Header';
import { PokemonsLists } from '../components/PokemonsList';
import { Footer } from '../components/UI/Footer';
import { PokemonsContext } from '../context/PokemonsContext';
import { useContext } from 'react';



export function HomePage() {
const { loading } = useContext(PokemonsContext);
  return (
    <>
      <Header />
      <PokemonsLists />
      {!loading ? <Footer /> : null}
    </>
  );
}

