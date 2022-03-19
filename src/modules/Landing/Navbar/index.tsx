import { useSelector } from 'react-redux';
import { css } from '@emotion/react';

import { getWindowHeight } from '../../../store/slices/Window/selectors';
import { getScrollY } from '../../../store/slices/Scroll/selectors';

export default () => {
  const windowHeight = useSelector(getWindowHeight);
  const scrollY = useSelector(getScrollY);

  const landingAnimationInViewport = scrollY < windowHeight;

  return (
    <section
      css={({ utils }) => css`
        padding: 0 10px;
        width: 100%;
        height: 60px;
        position: fixed;

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
        ${utils.getThemeVariantCSSWithFallback(
          'color',
          landingAnimationInViewport
            ? 'landing.navbar.animationInViewport.color'
            : 'landing.navbar.animationNotInViewport.color'
        )}

        opacity: ${landingAnimationInViewport ? 0.9 : 1};

        & > * {
          opacity: 1;
        }
      `}
    >
      <div>Hello{/* TODO Put logo here */}</div>
      <div>{/* TODO Put page navigation and dark mode toggle here */}</div>
    </section>
  );
};
