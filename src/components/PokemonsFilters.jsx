import classes from './PokemonsFilters.module.css'
import { PokemonTypes } from './PokemonTypes';
import { Button } from './UI/Button';
import { Icon } from './UI/Icon';
import { PokemonsContext } from '../context/PokemonsContext';
import { useContext, useEffect, useState } from 'react';

export function PokemonsFilters() {
  const { pokemons } = useContext(PokemonsContext);
  const [filter, setFilter]= useState(false);

  const uniqueTypes = [
    ...new Set(
      pokemons?.flatMap((pokemon) =>
        pokemon.type.map((type) => type.type.name)
      ) || []
    ),
  ];

  const handleClick = () => {
    const newFilter = !filter;
    setFilter(newFilter);
  };
  
  const handleTypeClick = (event) => {
    console.log(event.target.name)
  };
  

  return (
    <div className={classes.container}>
      {filter ? (
        <section
          style={{ height: '400px' }}
          className={classes.search_container}
        >
          <div className={classes.filters_container}>
            <h2>Avanced Search</h2>
            <section className={classes.types_container}>
              {uniqueTypes.map((type) => (
                <PokemonTypes
                  key={type}
                  type={type}
                  name={type}
                  onClick={handleTypeClick}
                  className={classes.type_pokemons}
                />
              ))}
            </section>
          </div>
        </section>
      ) : (
        <section className={classes.search_container}></section>
      )}
      <Button
        className={classes.button_container}
        onClick={handleClick}
        title={'Avanced Search'}
      >
        <Icon
          className={classes.icon}
          name={filter ? 'expand_up' : 'expand_down'}
        />
      </Button>
    </div>
  );
}