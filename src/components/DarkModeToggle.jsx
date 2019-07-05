import React from 'react';
import PropTypes from 'prop-types';

import { withTheme } from 'emotion-theming';

import { LIGHT_MODE, DARK_MODE } from '../config/dark-mode';

import Toggle from './Toggle';

const DarkModeToggle = ({ theme: { colorScheme } }) => {
  return (
    <Toggle
      /* eslint-disable no-underscore-dangle */
      checked={colorScheme === DARK_MODE}
      onChange={({ target: { checked } }) =>
        window.__setTheme(checked ? DARK_MODE : LIGHT_MODE)
      }
      /* eslint-enable no-underscore-dangle */
    />
  );
};

DarkModeToggle.propTypes = {
  theme: PropTypes.shape({
    colorScheme: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTheme(DarkModeToggle);
