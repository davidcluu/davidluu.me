import React from 'react';
import { css } from '@emotion/core';

import Div100vh from 'react-div-100vh';

import { useWindowScroll, useWindowSize } from 'react-use';

import {
  headerFontBoldCss,
  headerFontNormalCss,
} from '../../config/typography';

import {
  createLinearTweenFunction,
  createRgbTweenToRgbStringFunction,
} from '../../utils/tweens';

const backgroundLightModeBackgroundColorTween = createRgbTweenToRgbStringFunction(
  { r: 172, g: 248, b: 252 },
  { r: 255, g: 145, b: 134 }
);

const headerTextOpacityTween = createLinearTweenFunction(1, 0);

const LandingAnimation = () => {
  const { width, height } = useWindowSize();
  const { x, y } = useWindowScroll();

  const windowScrollRatio = y / height;
  // If the viewport is scrolled past the animation (windowScrollRatio >= 1), just return 1
  const landingScrollPercent = windowScrollRatio > 1 ? 1 : windowScrollRatio;

  console.log(width, height, x, y, landingScrollPercent);

  return (
    <Div100vh
      css={css`
        background-color: ${backgroundLightModeBackgroundColorTween(
          landingScrollPercent
        )};
      `}
    >
      {/* Header */}
      <header
        css={css`
          width: 100%;

          position: absolute;
          top: 25%;
          transform: translateY(-50%);
          z-index: 9998;

          text-align: center;
          opacity: ${headerTextOpacityTween(landingScrollPercent)};
        `}
      >
        <h1
          css={css`
            margin: 0;

            ${headerFontBoldCss}
            font-size: 3.5em;
            text-transform: uppercase;
          `}
        >
          David Luu
        </h1>
        <h3
          css={css`
            margin: 0;

            ${headerFontNormalCss}
            font-size: 1.5em;
            text-transform: uppercase;
          `}
        >
          Software Engineer, Web Developer
        </h3>
        <h4
          css={css`
            margin: 0;

            ${headerFontNormalCss}
            font-size: 1.25em;
            text-transform: uppercase;
          `}
        >
          Software Development Engineer II, Amazon
        </h4>
      </header>
      {/* Beach */}
      <div
        css={css`
          width: 100%;
          height: 60px;

          position: absolute;
          bottom: 0;

          background-color: #eed6af;
        `}
      />
    </Div100vh>
  );
};

export default LandingAnimation;
