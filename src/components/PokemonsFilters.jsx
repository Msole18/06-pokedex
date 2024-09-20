import classes from './PokemonsFilters.module.css'
import { Card } from './UI/Card'
import { Button } from './UI/Button';
import { Icon } from './UI/Icon';
import { PokemonTypes } from './PokemonTypes';
import { PokemonsContext } from '../context/PokemonsContext';
import { useContext, useEffect, useState } from 'react';

export function PokemonsFilters() {
  const { pokemons, error } = useContext(PokemonsContext);

  //Get all types in alphabetical order without repeating them
  const uniqueTypes = [
    ...new Set(
      pokemons?.flatMap((pokemon) =>
        pokemon.type.map((type) => type.type.name)
      ) || []
    ),
  ].sort((a, b) => a.localeCompare(b));

  const handleTypeClick = (type) => {
    console.log('click: ', type);
  };

  return (
    <form
      className={classes.form}
      // onSubmit={handleSubmit}
    >
      <h2>Avanced Search</h2>
      <section className={classes.types_container}>
        <p>Pokemons Types:</p>
        <ul className={classes.types_list}>
          {uniqueTypes.map((type) => (
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
          type='text'
          placeholder='1'
          // value={lowerSeq}
          // onChange={handleLowerSeqChange}
        />
        {' - '}
        <input
          style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent',
          }}
          className={classes.input}
          type='text'
          placeholder='1276'
          // value={upperSeq}
          // onChange={handleUpperSeqChange}
        />
      </section>
      <section className={classes.buttons_container}>
        <Button
          className={classes.button_container}
          // onClick={handleReset}
          title={'Reset Search'}
          name={'reset'}
        >
          Reset Search
        </Button>
        <Button
          className={classes.button_container}
          // onClick={handleSubmit}
          title={'Search'}
        >
          <Icon
            className={classes.icon}
            name='search'
          />
          Search
        </Button>
      </section>
    </form>
  );
}
