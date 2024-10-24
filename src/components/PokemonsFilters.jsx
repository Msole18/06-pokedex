import classes from './PokemonsFilters.module.css';
import advancedSearch from '../assets/advanced-search.png';
import { MINIMUM_POKEMONS_FOR_LOAD_MORE, MAXIMUM_POKEMONS_FOR_LOAD_MORE } from '../constants.jsx';
import { Button } from './UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { PokemonTypes } from './PokemonTypes';
import { PokemonsContext } from '../context/PokemonsContext';
import { useContext, useRef, useState } from 'react';
import { useValidation } from '../hooks/useValidation';

const TypesFilter = ({ types, selectedTypes, handleTypeClick }) => {
  return (
    <section className={classes.types_container}>
      <h3>Pokemons Types:</h3>
      <ul className={classes.types_list}>
        {types.map((type) => (
          <li key={type}>
            <div
              style={{
                transition: 'transform 0.2s, opacity 0.2s',
                opacity: selectedTypes.includes(type) ? 0.5 : 1,
              }}
            >
              <PokemonTypes
                className={`${classes.pokemons_type} ${
                  selectedTypes.includes(type) ? classes.selected : ''
                }`}
                onClick={() => handleTypeClick(type)}
                type={type}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const SequencesFilter = ({ previousOffset, previousLimit, inputError, handleInputChange, offsetValue, limitValue,  }) => {
  return (
    <section className={classes.sequences_container}>
      <h3>Pokemons Sequences: </h3>
      <div className={classes.inputs_container}>
        <div className={classes.offset}>
          <span>From number: </span>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: inputError ? 'red' : 'transparent',
            }}
            className={classes.input}
            ref={previousOffset}
            value={offsetValue}
            placeholder={MINIMUM_POKEMONS_FOR_LOAD_MORE}
            name='offsetInput'
            onChange={(e) => handleInputChange(e, 'offset')}
          />
        </div>

        <div className={classes.limit}>
          <span>To number: </span>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: inputError ? 'red' : 'transparent',
            }}
            className={classes.input}
            ref={previousLimit}
            value={limitValue}
            placeholder={MAXIMUM_POKEMONS_FOR_LOAD_MORE}
            name='limitInput'
            onChange={(e) => handleInputChange(e, 'limit')}
          />
        </div>
      </div>
      {inputError && (
        <p className={classes.error}>
          <span role="img" aria-label="error" style={{ fontSize: '15px' }}>
            ⚠️
          </span>
          {inputError}
        </p>
       )} 
    </section>
  );
}

const SubmitFiltersButtons = ({handleReset}) => {
  return (
    <section className={classes.buttons_container}>
      <Button
        className={classes.button_container}
        type='submit'
      >
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size='xl'
        />
        Search
      </Button>
      <Button
        className={classes.button_container}
        type='button'
        onClick={handleReset}
      >
        Reset Search
      </Button>
    </section>
  );
};

export function PokemonsFilters() {
  const {
    types,
    limit,
    setLimit,
    offset,
    setOffset,
    setResponsePokemons,
    selectedTypes,
    setSelectedTypes,
  } = useContext(PokemonsContext);

  const { inputError, inputFiltersValidation } = useValidation(); 

  // const [inputError, setInputError] = useState('');
  const [offsetValue, setOffsetValue] = useState('');  
  const [limitValue, setLimitValue] = useState(''); 
  const previousLimit = useRef(limit);
  const previousOffset = useRef(offset);

  const pokemonsTypes = types
    .filter(
      (type) => type !== 'stellar' && type !== 'shadow' && type !== 'unknown'
    )
    .sort((a, b) => a.localeCompare(b));

  // Handle type click
  const handleTypeClick = (type) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((existingType) => existingType !== type)
        : [...prevSelectedTypes, type]
    );
  };

  // Form submission function
  const handleSubmit = (event) => {
    event.preventDefault();
    const { limitInput, offsetInput } = Object.fromEntries(
      new window.FormData(event.target)
    );

    // Parse inputs
    const offsetNum = parseInt(offsetInput, 10);
    const limitNum = parseInt(limitInput, 10);

    // Perform validation
    const validationError = inputFiltersValidation(offsetNum, limitNum);
    if (!validationError) return;

    if (
      limitInput === previousLimit.current &&
      offsetInput === previousOffset.current
    )
      return;

    const clearPokemons = [];
    const newLimit = limitInput - offsetInput + 1;
    const newOffset = offsetInput - 1;

    setResponsePokemons(clearPokemons);
    setLimit(newLimit);
    setOffset(newOffset);


    previousLimit.current = limitInput;
    previousOffset.current = offsetInput;
  };


  const handleInputChange = (event, field) => {
    const value = event.target.value;
    if (field === 'offset') {
      setOffsetValue(value);
    } else if (field === 'limit') {
      setLimitValue(value);
    }
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setOffsetValue('');  
    setLimitValue(''); 
    previousOffset.current = MINIMUM_POKEMONS_FOR_LOAD_MORE; 
    previousLimit.current = MAXIMUM_POKEMONS_FOR_LOAD_MORE; 
  };

  return (
    <>
      <img
        className={classes.title}
        src={advancedSearch}
        alt='pokemon logo'
      />
      <form
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <TypesFilter
          types={pokemonsTypes}
          selectedTypes={selectedTypes}
          handleTypeClick={handleTypeClick}
        />
        <div className={classes.filters_container}>
          <SequencesFilter
            previousOffset={previousOffset}
            previousLimit={previousLimit}
            inputError={inputError}
            handleInputChange={handleInputChange}
            offsetValue={offsetValue}
            limitValue={limitValue}
          />
          <SubmitFiltersButtons handleReset={handleReset} />
        </div>
      </form>
    </>
  );
}
