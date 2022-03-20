import { css } from '@emotion/react';

import Sun from './svg/Sun';

export default () => {
  return (
    <div
      css={css`
        position: absolute;
      `}
    >
      <Sun />
    </div>
  );
};
