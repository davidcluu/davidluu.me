import { m, useTransform } from 'framer-motion';
import { css } from '@emotion/react';
import { max } from 'lodash/fp';

import useLandingScrollPercentMotionValue from '../hooks/use-landing-scroll-percent-motion-value';

import { banner as zIndex } from './z-indices';
import {
  headerFontBoldCss,
  headerFontNormalCss,
} from '../../../config/typography';

export default () => {
  const opacity = useTransform(
    useLandingScrollPercentMotionValue(),
    (percent) => max([0, 1 - percent * 3])
  );

  return (
    <m.header
      style={{ opacity }}
      css={css`
        width: 100%;

        z-index: ${zIndex};
        position: absolute;
        top: 25%;
        user-select: none;

        text-align: center;
      `}
    >
      <h1
        css={css`
          margin: 0;

          ${headerFontBoldCss}
          font-size: 2.5em;
        `}
      >
        David Luu
      </h1>
      <h2
        css={css`
          margin: 0;

          ${headerFontNormalCss}
          font-size: 1.5em;
        `}
      >
        Software Development Engineer II, Amazon
      </h2>
    </m.header>
  );
};
