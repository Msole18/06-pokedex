import pokeLogo from '../../assets/pokemon-logo.svg';
import classes from './Header.module.css';
import { Icon } from './Icon';
import { Button } from './Button';
import { FiltersPanel } from './FiltersPanel';
import { PokemonsContext } from '../../context/PokemonsContext';
import { useContext } from 'react';

export function Header() {
  
  const { 
    search, 
    setSearch, 
    getSearchedPokemons, 
    error 
  } = useContext(PokemonsContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newSearch = event.target.value;
    setSearch(newSearch);
    console.log('handleSubmit 1: ', { search });
    getSearchedPokemons({ search });
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setSearch(newSearch); 
  };

  return (
    <div className={classes.container}>
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
            type='submit'
          >
            <Icon
              className={classes.icon}
              name='search'
            />
          </Button>
        </form>
      </header>
      <FiltersPanel />
    </div>
  );
}
