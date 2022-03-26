import type { MotionValue } from 'framer-motion';

import { Fragment, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { m, useAnimation } from 'framer-motion';
import { css } from '@emotion/react';
import { map, compose } from 'lodash/fp';

import WaveSvg from './svg/Wave';

import { waves as baseZIndex } from './z-indices';
import { getRandomizationRatio } from './utils';

import useLandingScrollPercentMotionValue from '../hooks/use-landing-scroll-percent-motion-value';
import useTweenPercentMotionValue from '../../../hooks/use-tween-percent-motion-value';
import useMotionValueAsPercent from '../../../hooks/use-motion-value-as-percent';

const svgStrings = map(
  compose(encodeURIComponent, renderToString, (color: string) => (
    <WaveSvg color={color} />
  )),
  ['#28ded5', '#3ce6e0', '#65f0f0', '#82faf8', '#99f7f6']
);

const getTop = (landingScrollPercent: MotionValue<number>, index: number) =>
  useMotionValueAsPercent(
    useTweenPercentMotionValue(landingScrollPercent, [
      50 + 9 * index,
      50 + 9 * (svgStrings.length - 1),
    ])
  );

interface WaveProps {
  svgString: string;
  index: number;
}

export const Wave = ({ svgString, index }: WaveProps) => {
  const landingScrollPercent = useLandingScrollPercentMotionValue();

  const animation = useAnimation();

  const startAnimation = async (
    previousX: number = 0,
    previousY: number = 0
  ) => {
    const translateX = Math.random() * 40 - 20;
    const translateY = Math.random() * 40 - 20;

    const distance = Math.sqrt(
      Math.pow(previousX - translateX, 2) + Math.pow(previousY - translateY, 2)
    );

    await animation.start(
      { translateX, translateY },
      {
        duration: (distance / 20) * getRandomizationRatio(),
        ease: 'linear',
      }
    );
    startAnimation(translateX, translateY);
  };

  useEffect(startAnimation as () => void, []);

  return (
    <m.div
      key={svgString}
      data-label={`Wave${index}`}
      css={css`
        width: 200%;
        height: 140px;

        z-index: ${baseZIndex + index};
        position: absolute;
        left: -50%;

        background: url('data:image/svg+xml,${svgString}');
        background-position-x: ${40 * index}px;
      `}
      style={{
        top: getTop(landingScrollPercent, index),
      }}
      animate={animation}
    />
  );
};

const Waves = () => (
  <Fragment>
    {svgStrings.map((svgString, index) => (
      <Wave key={index} svgString={svgString} index={index} />
    ))}
  </Fragment>
);

export default Waves;
