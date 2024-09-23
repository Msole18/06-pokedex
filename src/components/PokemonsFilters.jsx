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
  inputError,
}) {
  return (
    <section className={classes.sequences_container}>
      <p>Pokemons Sequences: </p>
      <input
        style={{
          border: '1px solid transparent',
          borderColor: inputError ? 'red' : 'transparent',
        }}
        className={classes.input}
        ref={previousOffset}
        placeholder='1'
        name='offsetInput'
        onChange={handleInputChange} // Trigger validation on change
      />
      {' - '}
      <input
        style={{
          border: '1px solid transparent',
          borderColor: inputError ? 'red' : 'transparent',
        }}
        className={classes.input}
        ref={previousLimit}
        placeholder='1276'
        name='limitInput'
        onChange={handleInputChange} // Trigger validation on change
      />

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
    error,
  } = useContext(PokemonsContext);
  const [selectedTypes, setSelectedTypes] = useState([]);
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

  // Input validation function
  const validateInputs = (offset, limit) => {
    if (offset === '' || limit === '') {
      return ''; // No error if any input is empty
    }

    if (isNaN(offset) || isNaN(limit)) {
      return 'Both values must be numbers';
    }

    if (offset < 1 || offset > 1276 || limit < 1 || limit > 1276) {
      return 'Values must be between 1 and 1276';
    }

    if (offset >= limit) {
      return 'Offset must be less than limit';
    }

    return ''; // Return empty string if there are no errors
  };

  // Function to handle input changes and real-time validation
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update refs based on the input name
    if (name === 'offsetInput') {
      previousOffset.current.value = value; // Update with raw value
    } else if (name === 'limitInput') {
      previousLimit.current.value = value; // Update with raw value
    }

    // Parse inputs only if they are not empty
    const offset =
      value === '' ? '' : parseInt(previousOffset.current.value, 10);
    const limit = value === '' ? '' : parseInt(previousLimit.current.value, 10);

    // Perform validation
    const validationError = validateInputs(offset, limit);

    // Update error state for real-time feedback
    setInputError(validationError);
  };

  // Form submission function
  const handleSubmit = (event) => {
    event.preventDefault();
    const { limitInput, offsetInput } = Object.fromEntries(
      new window.FormData(event.target)
    );

    const offset = parseInt(offsetInput);
    const limit = parseInt(limitInput);

    // if there's a validation error
    if (inputError) return;

    // If values haven't changed, no need to update state
    if (
      limitInput === previousLimit.current &&
      offsetInput === previousOffset.current
    )
      return;

    const clearPokemons = [];
    const newLimit = limit - offset + 1;
    const newOffset = offset - 1;

    setResponsePokemons(clearPokemons);
    setLimit(newLimit);
    setOffset(newOffset);
    // Update input refs
    previousLimit.current = limitInput;
    previousOffset.current = offsetInput;
  };

  useEffect(() => {
    console.log('selectedTypes: ', selectedTypes);
  }, [selectedTypes]);

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
        handleInputChange={handleInputChange} // Handle input changes
        inputError={inputError} // Display error
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
