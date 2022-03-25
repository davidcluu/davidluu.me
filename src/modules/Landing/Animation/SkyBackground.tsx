import { motion, useTransform } from 'framer-motion';
import { css, useTheme } from '@emotion/react';

import useLandingScrollPercentMotionValue from '../hooks/use-landing-scroll-percent-motion-value';
import useViewportHeight from '../hooks/use-viewport-height';

export default () => {
  const {
    utils: { getThemeVariantCSSValue },
  } = useTheme();
  const landingScrollPercent = useLandingScrollPercentMotionValue();
  const backgroundColor = useTransform(
    landingScrollPercent,
    [0, 1],
    [
      getThemeVariantCSSValue('landing.animation.sky.initial.background-color'),
      getThemeVariantCSSValue('landing.animation.sky.final.background-color'),
    ]
  );

  return (
    <motion.div
      data-label="Sky"
      style={{
        height: useViewportHeight(),
        backgroundColor,
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
