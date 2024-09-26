import classes from './Pokemons.module.css';
import { PokemonCard } from './PokemonCard';
import { Button } from './UI/Button';
import { Loader } from './UI/Loader';
import { SortSelection } from './UI/SortSelection';
import { PokemonsContext } from '../context/PokemonsContext';
import { useContext } from 'react';


function ListOfPokemons({ pokemons }) {
  return (
    <ul className={classes.pokemons_list}>
      {pokemons.map((pokemon) => (
        <li key={pokemon.id}>
          <PokemonCard pokemon={pokemon} />
        </li>
      ))}
    </ul>
  );
}

function NoPokemonsResults({ error }) {
  return <p>{error ? error : 'No pokemons found for this search'}</p>;
}

export function Pokemons() {
  const {
    pokemons,
    sortedPokemons,
    setSortSelection,
    error,
    loading,
    handleLoadMore,
    MINIMUM_POKEMONS_FOR_LOAD_MORE,
  } = useContext(PokemonsContext);

  const hasPokemons = sortedPokemons?.length > 0;

  const handleChange = (event) => {
    const newSort = event.target.value;
    setSortSelection(newSort);
  };

  return (
    <>
      <main>
        <SortSelection onChange={handleChange} />
        {hasPokemons < 1 && loading ? (
          <Loader className={classes.loader} />
        ) : (
          <ListOfPokemons pokemons={sortedPokemons} />
        )}
        {error && <NoPokemonsResults error={error} />}
        {pokemons?.length >= MINIMUM_POKEMONS_FOR_LOAD_MORE && !loading ? (
          <Button
            className={classes.button_container}
            onClick={handleLoadMore}
            title={'More Pokemons'}
          >
            Load more
          </Button>
        ) : null}
      </main>
    </>
  );
}
