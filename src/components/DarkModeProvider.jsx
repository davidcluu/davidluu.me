import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider } from 'emotion-theming';

const DarkModeProvider = ({ children }) => {
  /* eslint-disable no-underscore-dangle */
  const [colorScheme, setColorScheme] = useState(window.__theme);

  useEffect(() => {
    window.__onThemeChange = () => setColorScheme(window.__theme);
  }, []);
  /* eslint-enable no-underscore-dangle */

  const theme = {
    colorScheme,
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DarkModeProvider;
