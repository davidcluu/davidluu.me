import { ClassNames, css } from '@emotion/react';

import Navbar from '../../../components/Navbar';
import DefaultNavigationLink from '../../../components/Navbar/NavigationLink';
import useMotionValueListener from '../../../hooks/use-motion-value-listener';

import useLandingScrollPercentMotionValue from '../hooks/use-landing-scroll-percent-motion-value';

const NavigationLink = (props) => {
  const landingAnimationInViewport =
    useMotionValueListener(useLandingScrollPercentMotionValue()) < 1;

  return (
    <DefaultNavigationLink
      css={({ utils }) => css`
        ${utils.getThemeVariantCSSWithFallback(
          'color',
          landingAnimationInViewport
            ? 'landing.navbar.animationInViewport.color'
            : 'landing.navbar.animationNotInViewport.color'
        )}
      `}
      {...props}
    />
  );
};

export default () => {
  const landingAnimationInViewport =
    useMotionValueListener(useLandingScrollPercentMotionValue()) < 1;

  return (
    <ClassNames>
      {({ css: classCss, theme: { utils } }) => (
        <Navbar
          NavigationLink={NavigationLink}
          wrapperClassName={classCss`
            ${utils.getThemeVariantCSSWithFallback(
              'background-color',
              landingAnimationInViewport
                ? 'landing.navbar.animationInViewport.background-color'
                : 'landing.navbar.animationNotInViewport.background-color'
            )}
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
        />
      )}
    </ClassNames>
  );
};
