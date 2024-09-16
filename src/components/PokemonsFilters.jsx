import classes from './PokemonsFilters.module.css'
import { Button } from './UI/Button';
import { useState } from 'react';

export function PokemonsFilters() {
  const [filter, setFilter]= useState(false);

  const handleFiltersClick = () => {
    const newFilter = !filter;
    setFilter(newFilter);
  };

  return (
    <div className={classes.container}>
      <div className={classes.frame}></div>
      {filter ? (
        <section className={classes.filters_container}>
          <p>filtros pokemons</p>
        </section>
      ) : null}
        <Button
          className={classes.filters_button}
          onClick={handleFiltersClick}
          name='Filters'
          icon='filter'
        />
      
    </div>
  );
}