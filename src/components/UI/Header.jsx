import pokeLogo from '../../assets/pokemon-logo.svg';
import classes from './Header.module.css';
import { Button } from './Button';
import { PokemonsFilters } from '../PokemonsFilters';
import { PokemonsContext } from '../../context/PokemonsContext';
import { useContext } from 'react';
import { Icon } from './Icon';

export function Header() {
  
  const { search, setSearch, getSearchedPokemons, error } = useContext(PokemonsContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    getSearchedPokemons({search});
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch); 
    getSearchedPokemons({search: newSearch});
  };

  return (
    <>
      <header className={classes.header}>
        <img
          className={classes.logo}
          src={pokeLogo}
          alt='pokemon logo'
        />
        <form
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <input
            style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent',
            }}
            className={classes.input}
            type='text'
            placeholder='Pikachu, 18, Charizar...'
            value={search}
            onChange={handleChange}
          />
          <Button
            className={classes.button_container}
            onClick={handleSubmit}
            title={'Search Pokemon'}
          >
            <Icon
              className={classes.icon}
              name='search'
            />
          </Button>
        </form>
      </header>
      <PokemonsFilters />
    </>
  );
}
