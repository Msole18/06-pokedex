import classes from './FiltersPanel.module.css';
import { Button } from './Button';
import { Icon } from './Icon';
import { PokemonsFilters } from '../PokemonsFilters';
import { useState } from 'react';


export function FiltersPanel() {  
  const [filter, setFilter] = useState(false);

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
        >
          <div className={classes.filters_container}>
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
      >
        <Icon
          className={classes.icon}
          name={filter ? 'expand_up' : 'expand_down'}
        />
      </Button>
    </div>
  );
}
