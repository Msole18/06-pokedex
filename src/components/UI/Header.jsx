import pokeLogo from '../../assets/pokemon-logo.png';
import classes from './Header.module.css';
import { Button } from './Button';
import { FiltersPanel } from './FiltersPanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { PokemonsContext } from '../../context/PokemonsContext';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useValidation } from '../../hooks/useValidation';

export function Header() {

  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/'; 
  
  const {
    search,
    setSearch,
    getSearchedPokemons,
    setFiltersHeight,
    resetApp,
  } = useContext(PokemonsContext);
  
  const {
    inputError,
    inputHeaderValidation,
  } = useValidation();
  

  const handleChange = (event) => {
    const newSearch = event.target.value;
    if (inputHeaderValidation(newSearch)) {
      setSearch(newSearch)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newSearch = event.target.value;
    if (inputHeaderValidation(newSearch)) {
      setSearch(newSearch)
      getSearchedPokemons({ search });
      if (!isHomePage) navigate('/');
    }

  };

  return (
    <div
      className={classes.container}
      style={{ position: isHomePage ? 'fixed' : 'static' }}
    >
      <header className={classes.header}>
        <Link
          to='/'
          onClick={resetApp}
        >
          <img
            className={classes.logo}
            src={pokeLogo}
            alt='pokemon logo'
          />
        </Link>
        <div className={classes.form_container}>
          <form
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <input
              style={{
                border: '1px solid transparent',
                borderColor: inputError ? 'red' : 'transparent',
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
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size='xl'
              />
            </Button>
          </form >
          {inputError && (
              <p className={classes.error}>
                <span role="img" aria-label="error" style={{ fontSize: '15px'}}>
                  ⚠️
                </span>
                {inputError}
              </p>
            )}
          </div>
      </header>

      <FiltersPanel setFiltersHeight={setFiltersHeight} />
    </div>
  );
}
