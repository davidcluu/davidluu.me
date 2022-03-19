import { css } from '@emotion/react';
import { max } from 'lodash/fp';

import useLandingScrollPercent from '../hooks/use-landing-scroll-percent';

import {
  headerFontBoldCss,
  headerFontNormalCss,
} from '../../../config/typography';

export default () => {
  const landingScrollPercent = useLandingScrollPercent();

  return (
    <header
      style={{ opacity: max([0, 1 - landingScrollPercent * 4]) }}
      css={css`
        width: 100%;

        position: absolute;
        top: 25%;

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
    </header>
  );
};
