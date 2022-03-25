import { MotionValue, useAnimation } from 'framer-motion';

import { Fragment, useEffect } from 'react';
import { m } from 'framer-motion';
import { css } from '@emotion/react';

import SvgCloud from './svg/Cloud';

import { clouds as baseZIndex } from './z-indices';

import useLandingScrollPercentMotionValue from '../hooks/use-landing-scroll-percent-motion-value';
import useTweenPercentMotionValue from '../../../hooks/use-tween-percent-motion-value';

const TRANSLATE_RANGE = 50;
const width = '110px';

const getTop = (
  landingScrollPercent: MotionValue<number>,
  percentRange: string[]
) => useTweenPercentMotionValue(landingScrollPercent, percentRange);

interface CloudProps {
  index: number;
  left: string;
  top: string;
}

const Cloud = ({ index, left, top }: CloudProps) => {
  const landingScrollPercent = useLandingScrollPercentMotionValue();

  const animation = useAnimation();

  const startAnimation = async (
    previousX: number = 0,
    previousY: number = 0
  ) => {
    const currentX = Math.random() * 2 * TRANSLATE_RANGE - TRANSLATE_RANGE;
    const currentY = Math.random() * 2 * TRANSLATE_RANGE - TRANSLATE_RANGE;

    const distance = Math.sqrt(
      Math.pow(previousX - currentX, 2) + Math.pow(previousY - currentY, 2)
    );

    await animation.start(
      {
        translateX: `${currentX}%`,
        translateY: `${currentY}%`,
      },
      { duration: distance / 20, ease: 'linear' }
    );
    startAnimation(currentX, currentY);
  };

  useEffect(startAnimation as () => void, []);

  return (
    <m.div
      data-label={`Cloud${index}`}
      css={css`
        width: ${width};

        z-index: ${baseZIndex + index};
        position: absolute;
        left: ${left};

        opacity: 0.8;
      `}
      animate={animation}
      style={{ top: getTop(landingScrollPercent, [top, '80%']) }}
    >
      <SvgCloud width={width} />
    </m.div>
  );
};

export default () => (
  <Fragment>
    {[
      { left: '5%', top: '10%' },
      { left: '80%', top: '15%' },
    ].map((props, index) => (
      <Cloud key={index} index={index} {...props} />
    ))}
  </Fragment>
);
