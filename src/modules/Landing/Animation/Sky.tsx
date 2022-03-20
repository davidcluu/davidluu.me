import { useTheme } from '@emotion/react';
import Color from 'color';

import { use100vh } from 'react-div-100vh';

import useLandingScrollPercent from '../hooks/use-landing-scroll-percent';

export default () => {
  const {
    utils: {
      getThemeVariantCSSValue,
      getThemeInvariantCSSValue,
      cssValueTransformers,
    },
  } = useTheme();
  const landingScrollPercent = useLandingScrollPercent();

  const viewportHeight = use100vh() || 0;
  const navbarHeight = getThemeInvariantCSSValue(
    'landing.navbar.desktop.height',
    cssValueTransformers.pixelToNumber
  );

  const initialBackgroundColor = Color(
    getThemeVariantCSSValue('landing.animation.sky.initial.background-color')
  );
  const finalBackgroundColor = Color(
    getThemeVariantCSSValue('landing.animation.sky.final.background-color')
  );

  return (
    <div
      style={{
        height: `${viewportHeight - navbarHeight}px`,
        backgroundColor: initialBackgroundColor
          .mix(finalBackgroundColor, landingScrollPercent)
          .hex(),
      }}
    />
  );
};
