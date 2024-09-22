import classes from './PokemonsFilters.module.css'
import { Button } from './UI/Button';
import { Icon } from './UI/Icon';
import { PokemonTypes } from './PokemonTypes';
import { PokemonsContext } from '../context/PokemonsContext';
import { useContext } from 'react';

function TypesFilter (types) {

  const handleTypeClick = (type) => {
    console.log('click: ', type);
  };
  return (
    <section className={classes.types_container}>
      <p>Pokemons Types:</p>
      <ul className={classes.types_list}>
        {types.map((type) => (
          <li key={type}>
            <PokemonTypes
              className={classes.pokemons_type}
              onClick={handleTypeClick}
              type={type}
            />
          </li>
        ))}
      </ul>
    </section>
  ); 
}

export function PokemonsFilters() {
  const { types, limit, setLimit, offset, setOffeset, error } = useContext(PokemonsContext);

  const pokemonsTypes = types
    .filter((type) => type !== 'stellar' && type !== 'unknown')
    .sort((a, b) => a.localeCompare(b));


  const handleTypeClick = (type) => {
    console.log('click: ', type);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fields = Object.fromEntries(new window.FormData(event.target))
    console.log('fields:', fields);
  };

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}
    >
      <h2>Avanced Search</h2>
      <section className={classes.types_container}>
        <p>Pokemons Types:</p>
        <ul className={classes.types_list}>
          {pokemonsTypes.map((type) => (
            <li key={type}>
              <PokemonTypes
                className={classes.pokemons_type}
                onClick={handleTypeClick}
                type={type}
              />
            </li>
          ))}
        </ul>
      </section>
      <section className={classes.sequences_container}>
        <p>Pokemons Sequences: </p>
        <input
          style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent',
          }}
          className={classes.input}
          placeholder='1'
          name='lowerSeq'
          // onChange={handleLowerSeqChange}
        />
        {' - '}
        <input
          style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent',
          }}
          className={classes.input}
          placeholder='1276'
          name='highSeq'
          // onChange={handleUpperSeqChange}
        />
      </section>
      <section className={classes.buttons_container}>
        <Button
          className={classes.button_container}
          type='submit'
          title={'Search'}
        >
          <Icon
            className={classes.icon}
            type='submit'
            name='search'
          />
          Search
        </Button>
        <Button
          className={classes.button_container}
          type='submit'
          name={'reset'}
        >
          Reset Search
        </Button>
      </section>
    </form>
  );
}
