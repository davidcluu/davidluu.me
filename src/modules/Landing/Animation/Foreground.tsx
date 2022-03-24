import { css, useTheme } from '@emotion/react';
import { use100vh } from 'react-div-100vh';

import Beach from './Beach';
import Sun from './Sun';
import Clouds from './Clouds';
import Waves from './Waves';

export default () => {
  const {
    utils: { getThemeInvariantCSSValue, cssValueTransformers },
  } = useTheme();
  const viewportHeight = use100vh() || (window && window.innerHeight) || 0;
  const navbarHeight = getThemeInvariantCSSValue(
    'navbar.desktop.height',
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
          'navbar.desktop.height'
        )}

        position: relative;
        overflow: hidden;

        background: transparent;
      `}
    >
      <Sun />
      <Clouds />
      <Waves />
      <Beach />
    </div>
  );
};
