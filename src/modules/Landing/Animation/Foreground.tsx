import { css, useTheme } from '@emotion/react';
import { use100vh } from 'react-div-100vh';

import Beach from './Beach';
import Sun from './Sun';

export default () => {
  const {
    utils: { getThemeInvariantCSSValue, cssValueTransformers },
  } = useTheme();
  const viewportHeight = use100vh() || 0;
  const navbarHeight = getThemeInvariantCSSValue(
    'landing.navbar.desktop.height',
    cssValueTransformers.pixelToNumber
  );

  const height = viewportHeight - navbarHeight;

  return (
    <div
      data-label="Foreground"
      style={{ height }}
      css={({ utils }) => css`
        ${utils.getThemeInvariantCSSWithFallback(
          'margin-top',
          'landing.navbar.desktop.height'
        )}

        position: relative;

        background: transparent;
      `}
    >
      <Sun />
      <Beach />
    </div>
  );
};
