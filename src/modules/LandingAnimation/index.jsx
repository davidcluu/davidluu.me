import React from 'react';
import { css } from '@emotion/core';

import Div100vh from 'react-div-100vh';

import { useWindowScroll, useWindowSize } from 'react-use';

import { DARK_MODE } from '../../config/dark-mode';

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

const backgroundDarkModeBackgroundColorTween = createRgbTweenToRgbStringFunction(
  { r: 15, g: 26, b: 58 },
  { r: 9, g: 68, b: 168 }
);

const headerTextOpacityTween = createLinearTweenFunction(1, 0);

const LandingAnimation = () => {
  const { height } = useWindowSize();
  const { y } = useWindowScroll();

  const windowScrollRatio = y / height;
  // If the viewport is scrolled past the animation (windowScrollRatio >= 1), just return 1
  const landingScrollPercent = windowScrollRatio > 1 ? 1 : windowScrollRatio;

  return (
    <Div100vh
      css={({ colorScheme }) => css`
        background-color: ${colorScheme === DARK_MODE
          ? backgroundDarkModeBackgroundColorTween(landingScrollPercent)
          : backgroundLightModeBackgroundColorTween(landingScrollPercent)};
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
          css={({ colorScheme }) => css`
            margin: 0;

            ${headerFontBoldCss}
            font-size: 3.5em;
            text-transform: uppercase;
            color: ${colorScheme === DARK_MODE ? '#fff' : '#000'};
          `}
        >
          David Luu
        </h1>
        <h3
          css={({ colorScheme }) => css`
            margin: 0;

            ${headerFontNormalCss}
            font-size: 1.5em;
            text-transform: uppercase;
            color: ${colorScheme === DARK_MODE ? '#fff' : '#000'};
          `}
        >
          Software Engineer, Web Developer
        </h3>
        <h4
          css={({ colorScheme }) => css`
            margin: 0;

            ${headerFontNormalCss}
            font-size: 1.25em;
            text-transform: uppercase;
            color: ${colorScheme === DARK_MODE ? '#fff' : '#000'};
          `}
        >
          Software Development Engineer II, Amazon
        </h4>
      </header>
    </Div100vh>
  );
};

export default LandingAnimation;
