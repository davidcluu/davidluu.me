import { Fragment } from 'react';
import { useTheme } from '@emotion/react';
import Color from 'color';

import { use100vh } from 'react-div-100vh';
import useLandingScrollPercent from '../hooks/use-landing-scroll-percent';

export default () => {
  const {
    utils: { getThemeVariantCSSValue },
  } = useTheme();
  const landingScrollPercent = useLandingScrollPercent();

  const initialBackgroundColor = Color(
    getThemeVariantCSSValue(
      'landing.animation.background.initial.background-color'
    )
  );

  const finalBackgroundColor = Color(
    getThemeVariantCSSValue(
      'landing.animation.background.final.background-color'
    )
  );

  return (
    <Fragment>
      <section
        style={{
          height: use100vh() + 'px',
          backgroundColor: initialBackgroundColor
            .mix(finalBackgroundColor, landingScrollPercent)
            .hex(),
        }}
      />
    </Fragment>
  );
};
