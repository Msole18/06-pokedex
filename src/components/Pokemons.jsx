import classes from './Pokemons.module.css';
import { PokemonCard } from './PokemonCard';
import { Button } from './UI/Button';
import { Loader } from './UI/Loader';
import { SortSelection } from './UI/SortSelection';
import { PokemonsContext } from '../context/PokemonsContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

function ListOfPokemons({ pokemons }) {

  return (
    <ul className={classes.pokemons_list}>
      {pokemons.map((pokemon) => (
        <li key={pokemon.id} >
          <Link
            to={`/pokemon/${pokemon.id}`}
            className={classes.link}
          >
            <PokemonCard pokemon={pokemon} />
          </Link>
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
    filtersHeight,
  } = useContext(PokemonsContext);

  const hasPokemons = sortedPokemons?.length > 0;

  const handleChange = (event) => {
    const newSort = event.target.value;
    setSortSelection(newSort);
  };

  return (
    <main
      style={{
        paddingTop: filtersHeight > 280 ? `${filtersHeight + 200}px` : `200px`,
      }}
    >
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
  );
}
