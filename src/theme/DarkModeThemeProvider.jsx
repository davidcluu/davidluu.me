import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from 'emotion-theming';

import { useDarkModeContext } from '../context/DarkMode';

const DarkModeThemeProvider = ({ children }) => (
  <ThemeProvider theme={{ darkMode: useDarkModeContext() }}>
    {children}
  </ThemeProvider>
);

DarkModeThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DarkModeThemeProvider;
