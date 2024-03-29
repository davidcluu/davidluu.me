import type { MotionValue } from 'framer-motion';

import { Fragment, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { m, useAnimation } from 'framer-motion';
import { css, useTheme } from '@emotion/react';
import { map, compose } from 'lodash/fp';

import WaveSvg from './svg/Wave';

import { waves as baseZIndex } from './z-indices';
import { getRandomizationRatio } from './utils';

import useLandingScrollPercentMotionValue from '../hooks/use-landing-scroll-percent-motion-value';
import useTweenPercentMotionValue from '../../../hooks/use-tween-percent-motion-value';
import useMotionValueAsPercent from '../../../hooks/use-motion-value-as-percent';
import { useAppSelector } from '../../../store/hooks';
import { getWindowHeight } from '../../../store/slices/Window/selectors';
import { range } from 'lodash';

const SVG_STRINGS = 5;

const getTop = (landingScrollPercent: MotionValue<number>, index: number) =>
  useMotionValueAsPercent(
    useTweenPercentMotionValue(landingScrollPercent, [
      50 + 9 * index,
      50 + 9 * (SVG_STRINGS - 1),
    ])
  );

interface WaveProps {
  svgString: string;
  index: number;
}

export const Wave = ({ svgString, index }: WaveProps) => {
  const landingScrollPercent = useLandingScrollPercentMotionValue();
  const windowHeight = useAppSelector(getWindowHeight);

  const translatePixels = 0.02 * windowHeight;
  const height = Math.floor(0.15 * windowHeight);

  const animation = useAnimation();

  const startAnimation = async (
    previousX: number = 0,
    previousY: number = 0
  ) => {
    const translateX = Math.random() * 2 * translatePixels - translatePixels;
    const translateY = Math.random() * 2 * translatePixels - translatePixels;

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

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <m.div
      key={svgString}
      data-label={`Wave${index}`}
      css={css`
        width: 200%;
        height: ${height}px;

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

const Waves = () => {
  const {
    utils: { getThemeVariantCSSValue },
  } = useTheme();

  const svgStrings = map(
    compose(encodeURIComponent, renderToString, (color: string) => (
      <WaveSvg color={color} />
    )),
    map(
      (index) =>
        // @ts-ignore
        getThemeVariantCSSValue<string>(`landing.animation.wave${index}.color`),
      range(0, SVG_STRINGS)
    )
  );

  return (
    <Fragment>
      {svgStrings.map((svgString, index) => (
        <Wave key={index} svgString={svgString} index={index} />
      ))}
    </Fragment>
  );
};

export default Waves;
