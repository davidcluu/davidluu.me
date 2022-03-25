import type { MotionValue } from 'framer-motion';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';

import Cloud from './svg/Cloud';

import { clouds as baseZIndex } from './z-indices';

import useLandingScrollPercentMotionValue from '../hooks/use-landing-scroll-percent-motion-value';
import useTweenPercentMotionValue from '../../../hooks/use-tween-percent-motion-value';
import useMotionValueAsPercent from '../../../hooks/use-motion-value-as-percent';

const width = '110px';

const getTop = (landingScrollPercent: MotionValue<number>) =>
  useMotionValueAsPercent(
    useTweenPercentMotionValue(landingScrollPercent, [10, 75])
  );

export default () => {
  var zIndex = baseZIndex;

  return (
    <Fragment>
      <motion.div
        data-label="PermanentCloud1"
        css={css`
          width: ${width};

          z-index: ${zIndex++};
          position: absolute;
          left: 5%;

          opacity: 0.8;
        `}
        style={{ top: getTop(useLandingScrollPercentMotionValue()) }}
      >
        <Cloud width={width} />
      </motion.div>
    </Fragment>
  );
};
