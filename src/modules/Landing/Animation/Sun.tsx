import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { css } from '@emotion/react';
import { m, useTransform } from 'framer-motion';

import Sun from './svg/Sun';
import { sun as zIndex } from './z-indices';

import { getSize } from '../../../store/slices/Window/selectors';

import useLandingScrollPercentMotionValue from '../hooks/use-landing-scroll-percent-motion-value';

export default () => {
  const {
    utils: {
      getThemeInvariantCSSValue,
      getThemeVariantCSSValue,
      cssValueTransformers,
    },
  } = useTheme();
  const color = getThemeVariantCSSValue<string>(
    'landing.animation.sunOrMoon.color'
  );

  const { width, height } = useSelector(getSize);

  const sunInitialX = getThemeInvariantCSSValue(
    'landing.animation.desktop.sun.initial-x',
    cssValueTransformers.pixelToNumber
  );
  const sunInitialY = getThemeInvariantCSSValue(
    'landing.animation.desktop.sun.initial-y',
    cssValueTransformers.pixelToNumber
  );

  const sunGoalX = width;
  const sunGoalY = height * 1.5;

  const landingScrollPercent = useLandingScrollPercentMotionValue();

  // Scroll-responsively animate the sun from the starting point at 0 degrees
  // to the ending point at 90 degrees (pi)
  const landingScrollRadian = useTransform(
    landingScrollPercent,
    (percent) => percent * (Math.PI / 2)
  );

  const top = useTransform(
    landingScrollRadian,
    (radian) => sunGoalY - Math.cos(radian) * (sunGoalY - sunInitialY)
  );
  const right = useTransform(
    landingScrollRadian,
    (radian) => sunInitialX + Math.sin(radian) * (sunGoalX - sunInitialX)
  );

  return (
    <m.div
      data-label="SunOrMoon"
      css={({ utils }) => css`
        ${utils.getThemeInvariantCSSWithFallback(
          'width',
          'landing.animation.desktop.sun.radius'
        )}
        ${utils.getThemeInvariantCSSWithFallback(
          'height',
          'landing.animation.desktop.sun.radius'
        )}

        z-index: ${zIndex};
        position: absolute;
      `}
      style={{
        top,
        right,
      }}
    >
      <Sun width="100%" height="100%" color={color} />
    </m.div>
  );
};
