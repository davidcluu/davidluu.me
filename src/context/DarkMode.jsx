import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { DARK_MODE, LIGHT_MODE } from '../config/dark-mode';

const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children, ssr }) => {
  /* eslint-disable no-underscore-dangle */
  const [colorScheme, setStateColorScheme] = useState(
    ssr ? LIGHT_MODE : window.__theme
  );

  useEffect(() => {
    window.__onThemeChange = () => setStateColorScheme(window.__theme);
  }, []);

  const setColorScheme = ssr ? () => {} : window.__setTheme;
  /* eslint-enable no-underscore-dangle */

  const value = {
    setDarkColorScheme: () => setColorScheme(DARK_MODE),
    setLightColorScheme: () => setColorScheme(LIGHT_MODE),
    isDarkMode: colorScheme === DARK_MODE,
    isLightMode: colorScheme === LIGHT_MODE,
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};

DarkModeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  ssr: PropTypes.bool,
};

DarkModeContextProvider.defaultProps = {
  ssr: false,
};

export const useDarkModeContext = () => useContext(DarkModeContext);
