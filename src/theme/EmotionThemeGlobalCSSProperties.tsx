import { css, Global } from '@emotion/react';

import themeConfig from './config';
import { mapThemeConfigToCssObject } from './mappers';
import { lightModeClassName, darkModeClassName } from './constants';

export default () => (
  <Global
    styles={css`
      // Theme-invariant properties
      body {
        ${mapThemeConfigToCssObject(themeConfig.themeInvariant)}
      }

      // Theme-dependent properties
      body,
      body.${lightModeClassName} {
        ${mapThemeConfigToCssObject(themeConfig.lightMode)}
      }
      body.${darkModeClassName} {
        ${mapThemeConfigToCssObject(themeConfig.darkMode)}
      }
    `}
  />
);
