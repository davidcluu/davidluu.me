import { Fragment } from 'react';
import { renderToString } from 'react-dom/server';
import { css } from '@emotion/react';
import { map, compose } from 'lodash/fp';

import Wave from './svg/Wave';

import { waves as baseZIndex } from './z-indices';

const svgStrings = map(
  compose(encodeURIComponent, renderToString, (color: string) => (
    <Wave color={color} />
  )),
  ['#28ded5', '#3ce6e0', '#65f0f0', '#82faf8', '#99f7f6']
);

export default () => {
  return (
    <Fragment>
      {svgStrings.map((svgString, index) => (
        <div
          key={svgString}
          data-label={`Wave${index}`}
          css={css`
            width: 200%;
            height: 140px;

            z-index: ${baseZIndex + index};
            position: absolute;
            top: ${50 + 9 * index}%;

            background: url('data:image/svg+xml,${svgString}');
            background-position: ${40 * index}px 0;
          `}
        />
      ))}
    </Fragment>
  );
};
