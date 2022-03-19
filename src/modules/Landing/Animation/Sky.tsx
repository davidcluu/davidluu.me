import { useTheme } from '@emotion/react';
import Color from 'color';

import { use100vh } from 'react-div-100vh';

import useLandingScrollPercent from '../hooks/use-landing-scroll-percent';

import { navbarHeightPixels } from '../config';

export default () => {
  const {
    utils: { getThemeVariantCSSValue },
  } = useTheme();
  const landingScrollPercent = useLandingScrollPercent();

  const initialBackgroundColor = Color(
    getThemeVariantCSSValue('landing.animation.sky.initial.background-color')
  );

  const finalBackgroundColor = Color(
    getThemeVariantCSSValue('landing.animation.sky.final.background-color')
  );

  return (
    <div
      style={{
        height: (use100vh() as number) - navbarHeightPixels + 'px',
        backgroundColor: initialBackgroundColor
          .mix(finalBackgroundColor, landingScrollPercent)
          .hex(),
      }}
    />
  );
};
