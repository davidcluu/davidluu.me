import { css } from '@emotion/react';

import { navbarHeightPixels } from '../config';

export default () => (
  <div
    css={({ utils }) => css`
      height: ${navbarHeightPixels}px;

      ${utils.getThemeVariantCSSWithFallback(
        'background-color',
        'landing.animation.beach.background-color'
      )}
    `}
  />
);
