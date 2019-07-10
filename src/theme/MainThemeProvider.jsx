import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from 'emotion-theming';

const darkModeTheme = {
  navbar: {
    backgroundColorLanding: 'rgba(0, 0, 0, 0.9)',
    backgroundColor: '#3c3c3c',
  },
};

const lightModeTheme = {
  navbar: {
    backgroundColorLanding: 'rgb(255, 255, 255, 0.9)',
    backgroundColor: 'rgb(44, 62, 80)',
  },
};

const adjustTheme = ({ darkMode }) => ({
  darkMode,
  ...(darkMode.isDarkMode ? darkModeTheme : lightModeTheme),
});

const MainThemeProvider = ({ children }) => (
  <ThemeProvider theme={adjustTheme}>{children}</ThemeProvider>
);

MainThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainThemeProvider;
