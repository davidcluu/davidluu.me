import type { MotionValue } from 'framer-motion';

import { m } from 'framer-motion';
import { Fragment } from 'react';
import { renderToString } from 'react-dom/server';
import { css } from '@emotion/react';
import { map, compose } from 'lodash/fp';

import Wave from './svg/Wave';

import { waves as baseZIndex } from './z-indices';

import useLandingScrollPercentMotionValue from '../hooks/use-landing-scroll-percent-motion-value';
import useTweenPercentMotionValue from '../../../hooks/use-tween-percent-motion-value';
import useMotionValueAsPercent from '../../../hooks/use-motion-value-as-percent';

const svgStrings = map(
  compose(encodeURIComponent, renderToString, (color: string) => (
    <Wave color={color} />
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

export default () => {
  const landingScrollPercent = useLandingScrollPercentMotionValue();

  return (
    <Fragment>
      {svgStrings.map((svgString, index) => (
        <m.div
          key={svgString}
          data-label={`Wave${index}`}
          css={css`
            width: 200%;
            height: 140px;

            z-index: ${baseZIndex + index};
            position: absolute;

            background: url('data:image/svg+xml,${svgString}');
            background-position: ${40 * index}px 0;
          `}
          style={{
            top: getTop(landingScrollPercent, index),
          }}
        />
      ))}
    </Fragment>
  );
};
