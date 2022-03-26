import { css, useTheme } from '@emotion/react';

import Beach from './Beach';
import Sun from './Sun';
import Clouds from './Clouds';
import Waves from './Waves';

import useViewportHeight from '../hooks/use-viewport-height';

export default () => {
  const {
    utils: { getThemeInvariantCSSValue, cssValueTransformers },
  } = useTheme();
  const viewportHeight = useViewportHeight();
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
