import classes from './FiltersPanel.module.css';
import { Button } from './Button';
import { Icon } from './Icon';
import { PokemonsFilters } from '../PokemonsFilters';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';


export function FiltersPanel({ setFiltersHeight }) {
  const [filter, setFilter] = useState(false);
  const searchContainerRef = useRef(null);

  // Get the current page or location
  const location = useLocation();
  const isPokemonPage = location.pathname.startsWith('/pokemon/'); // check if the currente page is the PokemonPage


  useEffect(() => {
    if (filter && searchContainerRef.current) {
      const height = searchContainerRef.current.offsetHeight;
      setFiltersHeight(height); 
    } else if (!filter) {
      setFiltersHeight(40);
    }
  }, [filter, setFiltersHeight]);

  const handleClick = () => {
    const newFilter = !filter;
    setFilter(newFilter);
  };

  return (
    <div className={classes.container}>
      {filter && (
        <section
          className={classes.search_container}
          style={{ minHeight: 'max-content' }}
          ref={searchContainerRef}
        >
          <div className={classes.filters_container}>como
            <PokemonsFilters />
          </div>
        </section>
      )}

      <section
        className={classes.search_container}
        style={{ height: '40px' }}
      ></section>

      <Button
        className={classes.button_container}
        onClick={handleClick}
        title={'Avanced Search'}
        disabled={isPokemonPage}
      >
        {!isPokemonPage && (
          <Icon
            className={classes.icon}
            name={filter ? 'expand_up' : 'expand_down'}
          />
        )}
      </Button>
    </div>
  );
}
