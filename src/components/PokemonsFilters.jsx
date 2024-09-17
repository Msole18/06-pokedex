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
      {/* <div className={classes.frame}></div> */}
      {/* {filter ? (
        <section className={classes.filters_container}>
          <p>filtros pokemons</p>
        </section>
      ) : null} */}

      {filter ? (
        <section
          style={{ height: '250px' }}
          className={classes.search_container}
        >
          <div className={classes.filters_container}>
            <p>filtros pokemons</p>
          </div>
        </section>
      ) : (
        <section className={classes.search_container}></section>
      )}
      <Button
        className={classes.button_container}
        onClick={handleFiltersClick}
        name='Advanced Search'
        icon={filter ? 'expand_up' : 'expand_down'}
      />
    </div>
  );
}