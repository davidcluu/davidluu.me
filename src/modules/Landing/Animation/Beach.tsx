import { css } from '@emotion/react';

export default () => (
  <div
    css={({ utils }) => css`
      ${utils.getThemeInvariantCSSWithFallback(
        'height',
        'landing.navbar.desktop.height'
      )}

      ${utils.getThemeVariantCSSWithFallback(
        'background-color',
        'landing.animation.beach.background-color'
      )}
    `}
  />
);
