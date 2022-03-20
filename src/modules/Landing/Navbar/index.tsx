import { css } from '@emotion/react';

import NavigationLink from './NavigationLink';

import useLandingScrollPercent from '../hooks/use-landing-scroll-percent';

import { headerFontNormalCss } from '../../../config/typography';

export default () => {
  const landingAnimationInViewport = useLandingScrollPercent() < 1;

  return (
    <nav
      css={({ utils }) => css`
        width: 100%;
        ${utils.getThemeInvariantCSSWithFallback(
          'height',
          'landing.navbar.desktop.height'
        )}

        position: fixed;
        top: 0;
        z-index: 9999;
        display: flex;
        justify-content: space-between;
        align-items: center;

        ${utils.getThemeVariantCSSWithFallback(
          'background-color',
          landingAnimationInViewport
            ? 'landing.navbar.animationInViewport.background-color'
            : 'landing.navbar.animationNotInViewport.background-color'
        )}
        ${headerFontNormalCss}
        ${utils.getThemeVariantCSSWithFallback(
          'color',
          landingAnimationInViewport
            ? 'landing.navbar.animationInViewport.color'
            : 'landing.navbar.animationNotInViewport.color'
        )}
        opacity: ${landingAnimationInViewport ? 0.8 : 1};

        & > * {
          opacity: 1;
        }
      `}
    >
      <div>{/* TODO Put logo here */}</div>
      <div>
        <NavigationLink href="/resume">Resume</NavigationLink>
        <NavigationLink href="/resume">Resume</NavigationLink>
        <NavigationLink href="/resume">Resume</NavigationLink>
      </div>
    </nav>
  );
};
