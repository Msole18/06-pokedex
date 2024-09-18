import classes from './Pokemons.module.css';
import { PokemonCard } from './PokemonCard';
import { Button } from './UI/Button';
import { PokemonsContext } from '../context/PokemonsContext';
import { useContext, useEffect } from 'react';
import { SortSelection } from './UI/SortSelection';
import { Icon } from './UI/Icon';

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

function NoPokemonsResults() {
  return <p>No pokemons found for this search</p>;
}

export function Pokemons() {
  const { pokemons, 
          getPokemons,
          getAllPokemons, 
          sortedPokemons, 
          setSortSelection 
  } = useContext(PokemonsContext);

  const hasPokemons = sortedPokemons?.length > 0;

  const handleChange = (event) => {
    const newSort = event.target.value;
    setSortSelection(newSort);
    console.log(sortedPokemons);
  };

  const handleClick = () => {
    alert('Button clicked!');
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <main>
      {hasPokemons ? (
        <>
          <SortSelection onChange={handleChange} />
          <ListOfPokemons pokemons={sortedPokemons} />
        </>
      ) : (
        <NoPokemonsResults />
      )}
      {pokemons?.length >= 50 ? (
        <Button
          className={classes.button_container}
          onClick={handleClick}
          title={'More Pokemons'}
        >
          <Icon
            className={classes.icon}
            name='expand_down'
          />
        </Button>
      ) : null}
    </main>
  );
}
