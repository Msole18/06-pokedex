import classes from './Pokemons.module.css';
import{ PokemonCard } from './PokemonCard'
import { Button } from './UI/Button';
import { useSort } from '../hooks/useSort';
import { PokemonsContext } from '../context/PokemonsContext';
import { useContext, useEffect } from 'react';

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
  return<p>No pokemons found for this search</p>;
}

export function Pokemons() {
  const { pokemons, getAllPokemons, error } = useContext(PokemonsContext);
  const { sortedPokemons, setSortSelection } = useSort(pokemons)
  const hasPokemons = pokemons?.length > 0;

  const handleChange = (event) => {
    const newSort = event.target.value;
    setSortSelection(newSort)
  }

  const handleClick = () => {
    alert('Button clicked!');
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <main>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {hasPokemons ? (
        <>
          <section className={classes.selection}>
            <label htmlFor='dropdown'>Sort Pokemon by:</label>
            <select
              id='dropdown'
              name='pokemon'
              onChange={handleChange}
              defaultValue={'increaseId'}
            >
              <option value='increaseId'>Number: Low to High</option>
              <option value='decreaseId'>Number: High to Low</option>
              <option value='increaseName'>Name: A-Z</option>
              <option value='decreaseName'>Name: Z-A</option>
            </select>
          </section>
          <ListOfPokemons pokemons={sortedPokemons} />
        </>
      ) : (
        <NoPokemonsResults />
      )}
      {pokemons?.length >= 50 ? (
        <Button
          name='More'
          icon='expand_down'
          onClick={handleClick}
        />
      ) : null}
    </main>
  );
}
