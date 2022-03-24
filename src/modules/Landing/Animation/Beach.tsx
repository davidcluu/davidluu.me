import { css } from '@emotion/react';

import { beach as zIndex } from './z-indices';

export default () => (
  <div
    data-label="Beach"
    css={({ utils }) => css`
      width: 100%;
      ${utils.getThemeInvariantCSSWithFallback(
        'height',
        'navbar.desktop.height'
      )}

      z-index: ${zIndex};
      position: absolute;
      bottom: 0;

      ${utils.getThemeVariantCSSWithFallback(
        'background-color',
        'landing.animation.beach.background-color'
      )}
    `}
  />
);
