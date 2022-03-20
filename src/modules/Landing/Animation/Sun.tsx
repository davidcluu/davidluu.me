import { css } from '@emotion/react';

import Sun from './svg/Sun';

export default () => {
  return (
    <div
      data-label="SunOrMoon"
      css={({ utils }) => css`
        ${utils.getThemeInvariantCSSWithFallback(
          'width',
          'landing.animation.sun.radius'
        )}
        ${utils.getThemeInvariantCSSWithFallback(
          'height',
          'landing.animation.sun.radius'
        )}

        position: absolute;
      `}
      style={{
        top: 25,
        right: 25,
      }}
    >
      <Sun width="100%" height="100%" />
    </div>
  );
};
