import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/react';

import Sun from './svg/Sun';
import { sun as zIndex } from './z-indices';

import { getSize } from '../../../store/slices/Window/selectors';

import useLandingScrollPercent from '../hooks/use-landing-scroll-percent';

export default () => {
  const {
    utils: { getThemeInvariantCSSValue, cssValueTransformers },
  } = useTheme();
  const { width, height } = useSelector(getSize);
  const landingScrollPercent = useLandingScrollPercent();

  const sunInitialX = getThemeInvariantCSSValue(
    'landing.animation.sun.initial-x',
    cssValueTransformers.pixelToNumber
  );
  const sunInitialY = getThemeInvariantCSSValue(
    'landing.animation.sun.initial-y',
    cssValueTransformers.pixelToNumber
  );

  const sunGoalX = width;
  const sunGoalY = height;

  // Scroll-responsively animate the sun from the starting point at 0 degrees
  // to the ending point at 90 degrees (pi)
  const sunRadian = landingScrollPercent * (Math.PI / 2);

  const top = sunGoalY - Math.cos(sunRadian) * (sunGoalY - sunInitialY);
  const right = sunInitialX + Math.sin(sunRadian) * (sunGoalX - sunInitialX);

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

        z-index: ${zIndex};
        position: absolute;
      `}
      style={{
        top,
        right,
      }}
    >
      <Sun width="100%" height="100%" />
    </div>
  );
};
