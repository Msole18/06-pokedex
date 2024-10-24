import { MINIMUM_POKEMONS_FOR_LOAD_MORE, MAXIMUM_POKEMONS_FOR_LOAD_MORE } from '../constants.jsx';
import { useState } from "react";

export function useValidation() {
  const [inputError, setInputError] = useState('');

  // Input Validation Control
  const inputHeaderValidation = (inputValue) => {
    if (inputValue === '') {
      setInputError('');
      return true;
    }

    if (inputValue.startsWith(' ')) {
      setInputError('The search cannot begin with a space.');
      return false;
    }

    const numberRegex = /^[0-9]+$/;
    if (numberRegex.test(inputValue)) {
      const numberValue = parseInt(inputValue, 10);
      if (numberValue < MINIMUM_POKEMONS_FOR_LOAD_MORE || numberValue > MAXIMUM_POKEMONS_FOR_LOAD_MORE) {
        setInputError(`Values must be between ${MINIMUM_POKEMONS_FOR_LOAD_MORE} and ${MAXIMUM_POKEMONS_FOR_LOAD_MORE}.`);
        return false;
      }
    }

    const letterAndDashRegex = /^[a-zA-Z0-9\s]+$/;
    if (!letterAndDashRegex.test(inputValue)) {
      setInputError(`Only letters without special characters or punctuation marks are allowed.`);
      return false;
    }

    setInputError('');
    return true; // No errors
  };

  const inputFiltersValidation = (offset, limit) => {
    if (isNaN(offset) || isNaN(limit)) {
      setInputError('Values must be numbers.');
      return false;
    }

    if (offset < MINIMUM_POKEMONS_FOR_LOAD_MORE || offset > MAXIMUM_POKEMONS_FOR_LOAD_MORE || limit < MINIMUM_POKEMONS_FOR_LOAD_MORE || limit > MAXIMUM_POKEMONS_FOR_LOAD_MORE) {
      setInputError(`Values must be between ${MINIMUM_POKEMONS_FOR_LOAD_MORE} and ${MAXIMUM_POKEMONS_FOR_LOAD_MORE}.`);
      return false;
    }

    if (offset > limit) {
      setInputError('From number must be less than To number.');
      return false;
    }

    setInputError('');
    return true; 
  };
  return {
    inputError,
    setInputError, 
    inputHeaderValidation,
    inputFiltersValidation,
  };

}