import { Fragment } from 'react';
import { css } from '@emotion/react';

import Cloud from './svg/Cloud';

import { clouds as baseZIndex } from './z-indices';

const width = '110px';

export default () => {
  var zIndex = baseZIndex;

  return (
    <Fragment>
      <div
        data-label="PermanentCloud1"
        css={css`
          width: ${width};

          z-index: ${zIndex++};
          position: absolute;
          top: 10%;
          left: 5%;

          opacity: 0.8;
        `}
      >
        <Cloud width={width} />
      </div>
    </Fragment>
  );
};
