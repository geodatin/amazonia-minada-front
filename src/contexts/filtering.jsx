import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

const FilteringContext = createContext({});

/**
 * The FilteringProvider is a context to provide the dashboard filtering options.
 * */
export function FilteringProvider({ children }) {
  FilteringProvider.propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  };

  const [ucVisibility, setUcVisibility] = useState(true);
  const [tiVisibility, setTiVisibility] = useState(true);

  /**
   * This function handles the UC's visibility.
   * If the TI's visibility is currently setted to off, it's not possible to set off the UC's visibility.
   */
  function handleUcVisibility(newValue) {
    if (newValue || (!newValue && tiVisibility)) {
      setUcVisibility(newValue);
    }
  }

  /**
   * This function handles the TI's visibility.
   * If the UC's visibility is currently setted to off, it's not possible to set off the TI's visibility.
   */
  function handleTiVisibility(newValue) {
    if (newValue || (!newValue && ucVisibility)) {
      setTiVisibility(newValue);
    }
  }

  return (
    <FilteringContext.Provider
      value={{
        values: {
          ucVisibility,
          tiVisibility,
        },
        setters: {},
        functions: {
          handleUcVisibility,
          handleTiVisibility,
        },
      }}
    >
      {children}
    </FilteringContext.Provider>
  );
}

export default FilteringContext;
