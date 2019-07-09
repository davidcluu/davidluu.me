import React from 'react';

import { useDarkModeContext } from '../context/DarkMode';

import Toggle from './Toggle';

const DarkModeToggle = () => {
  const {
    isDarkMode,
    setDarkColorScheme,
    setLightColorScheme,
  } = useDarkModeContext();

  return (
    <Toggle
      checked={isDarkMode}
      onChange={({ target: { checked } }) =>
        checked ? setDarkColorScheme() : setLightColorScheme()
      }
    />
  );
};

export default DarkModeToggle;
