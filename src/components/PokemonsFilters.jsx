import classes from './PokemonsFilters.module.css';
import { Button } from './UI/Button';
import { Icon } from './UI/Icon';
import { PokemonTypes } from './PokemonTypes';
import { PokemonsContext } from '../context/PokemonsContext';
import { useContext, useEffect, useRef, useState } from 'react';

function TypesFilter({ types, selectedTypes, handleTypeClick }) {
  return (
    <section className={classes.types_container}>
      <p>Pokemons Types:</p>
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

function SequencesFilter({
  previousOffset,
  previousLimit,
  handleInputChange,
  handleBlur,
  inputError,
}) {
  return (
    <section className={classes.sequences_container}>
      <h4>Pokemons Sequences: </h4>
      <div>
        <p>From number: </p>
        <input
          style={{
            border: '1px solid transparent',
            borderColor: inputError ? 'red' : 'transparent',
          }}
          className={classes.input}
          ref={previousOffset}
          placeholder='1'
          name='offsetInput'
        />
      </div>
      <div>
        <p>To number: </p>
        <input
          style={{
            border: '1px solid transparent',
            borderColor: inputError ? 'red' : 'transparent',
          }}
          className={classes.input}
          ref={previousLimit}
          placeholder='1276'
          name='limitInput'
        />
      </div>
      {/* Show error message below the inputs */}
      {inputError && <p className={classes.error}>{inputError}</p>}
    </section>
  );
}

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
  const [inputError, setInputError] = useState('');
  const previousLimit = useRef(limit);
  const previousOffset = useRef(offset);

  const pokemonsTypes = types
    .filter((type) => type !== 'stellar' && type !== 'unknown')
    .sort((a, b) => a.localeCompare(b));

  // Handle type click
  const handleTypeClick = (type) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((existingType) => existingType !== type)
        : [...prevSelectedTypes, type]
    );
    
  };

 const validateInputs = (offset, limit) => {
  
   if (isNaN(offset) || isNaN(limit)) {
     return 'Values must be numbers';
   }

   if (offset < 1 || offset > 1276 || limit < 1 || limit > 1276) {
     return 'Values must be between 1 and 1276';
   }

   if (offset > limit) {
     return 'From number must be less than To number';
   }

   return ''; // No errors
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
    const validationError = validateInputs(offsetNum, limitNum);

    if (validationError) {
      setInputError(validationError);
      return;
    }

    if (
      limitInput === previousLimit.current &&
      offsetInput === previousOffset.current
    ) return 

    const clearPokemons = [];
    const newLimit = limitInput - offsetInput + 1;
    const newOffset = offsetInput - 1;

    setResponsePokemons(clearPokemons);
    setLimit(newLimit);
    setOffset(newOffset);

    setInputError('');
    previousLimit.current = limitInput;
    previousOffset.current = offsetInput;
  };

  useEffect(() => {
    console.log('useEffect selectedTypes: ', selectedTypes);
  }, [selectedTypes,limit,offset]);

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}
    >
      <h2>Advanced Search</h2>
      <TypesFilter
        types={pokemonsTypes}
        selectedTypes={selectedTypes}
        handleTypeClick={handleTypeClick}
      />
      <SequencesFilter
        previousOffset={previousOffset}
        previousLimit={previousLimit}
        inputError={inputError} 
      />

      <section className={classes.buttons_container}>
        <Button
          className={classes.button_container}
          type='submit'
        >
          <Icon
            className={classes.icon}
            name='search'
          />
          Search
        </Button>
        <Button
          className={classes.button_container}
          type='button'
          onClick={() => window.location.reload()}
        >
          Reset Search
        </Button>
      </section>
    </form>
  );
}
