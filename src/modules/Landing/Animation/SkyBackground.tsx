import { css, useTheme } from '@emotion/react';
import Color from 'color';

import Div100vh from 'react-div-100vh';

import useLandingScrollPercent from '../hooks/use-landing-scroll-percent';

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
    <Div100vh
      data-label="Sky"
      style={{
        backgroundColor: initialBackgroundColor
          .mix(finalBackgroundColor, landingScrollPercent)
          .hex(),
      }}
      css={css`
        width: 100%;

        position: absolute;
        top: 0;
        z-index: -1;
      `}
    />
  );
};
