import { ClassNames } from '@emotion/react';

import Navbar from '../../../components/Navbar';

import useMotionValueListener from '../../../hooks/use-motion-value-listener';
import useLandingScrollPercentMotionValue from '../hooks/use-landing-scroll-percent-motion-value';

const LandingNavbar = () => {
  const landingAnimationInViewport =
    useMotionValueListener(useLandingScrollPercentMotionValue()) < 1;

  return (
    <ClassNames>
      {({ css, theme: { utils } }) => (
        <Navbar
          wrapperClassName={css`
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

            & > * {
              opacity: 1;
            }
          `}
          linkClassName={css`
            ${utils.getThemeVariantCSSWithFallback(
              'color',
              landingAnimationInViewport
                ? 'landing.navbar.animationInViewport.color'
                : 'landing.navbar.animationNotInViewport.color'
            )}
          `}
          linkActiveClassName={css`
            font-weight: ${utils.getThemeInvariantCSSValue(
              'font.header.bold.font-weight'
            )} !important;
          `}
        />
      )}
    </ClassNames>
  );
};

export default LandingNavbar;
