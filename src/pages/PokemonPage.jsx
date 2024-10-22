import { useParams } from 'react-router-dom';
import { Header } from '../components/UI/Header';
import { PokemonDetails } from '../components/PokemonDetails';
import { Footer } from '../components/UI/Footer';
import { useContext } from 'react';
import { PokemonsContext } from '../context/PokemonsContext';

export function PokemonPage() {
  const { id } = useParams();
  const { loading } = useContext(PokemonsContext)

  return (
    <>
      <Header />
      <PokemonDetails pokemonId={id} />
      {!loading && <Footer />}
    </>
  );
}