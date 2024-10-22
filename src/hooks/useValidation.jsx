import { useState } from "react";


export function useValidation() {
  const [inputError, setInputError] = useState('');

  // Input Validation Control
  const inputHeaderValidation = (inputValue) => {
    console.log('inputHeaderValidation: ', inputValue)
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
      if (numberValue < 1 || numberValue > 1000) {
        setInputError('Only numbers between 1 and 1000 can be entered.');
        return false;
      }
    }

    const letterAndDashRegex = /^[a-zA-Z0-9\s]+$/;
    if (!letterAndDashRegex.test(inputValue)) {
      setInputError('Only letters without special characters or punctuation marks are allowed.');
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

    if (offset < 1 || offset > 1000 || limit < 1 || limit > 1000) {
      setInputError('Values must be between 1 and 1000.');
      return false;
    }

    if (offset > limit) {
      setInputError('From number must be less than To number.');
      return false;
    }

    setInputError('');
    return true; // No errors
  };
  return {
    inputError,
    setInputError, 
    inputHeaderValidation,
    inputFiltersValidation,
  };

}