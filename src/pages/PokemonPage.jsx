/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import { Header } from '../components/UI/Header';
import { Loader } from '../components/UI/Loader';
import { useContext, useEffect } from 'react';
import { PokemonsContext } from '../context/PokemonsContext';
import { PokemonDetails } from '../components/PokemonDetails';



export function PokemonPage() {
  const {
    setSearch,
    getSearchedPokemons,
    getEvolutionChain,
    sortedPokemons,
    loading,
  } = useContext(PokemonsContext);

  const { id } = useParams();

  const filteredPokemon = sortedPokemons.find(
    (poke) => poke.id.toString() === id
  );

  useEffect(() => {
    setSearch('');
    getSearchedPokemons({ search: id });
  }, [id, setSearch, getSearchedPokemons]);

  useEffect(() => {
    // console.log('useEffect filteredPokemon:', filteredPokemon);
    if (filteredPokemon) {
      const evolutionChain = filteredPokemon?.speciesUrl;
      // console.log('Evolution Chain:', evolutionChain);
      if (evolutionChain) {
        getEvolutionChain({ evolutionChain });
      }
      console.log('filteredPokemon:', filteredPokemon);
    }
  }, [filteredPokemon, getEvolutionChain]);
  
  return (
    <>
      <Header />

      {loading && <Loader />}
      {!loading && filteredPokemon 
        ? (<PokemonDetails pokemon={filteredPokemon} />) 
        : (!loading && <p>No se encontró el Pokémon.</p>)
      }
    </>
  );
}
