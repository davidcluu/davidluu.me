import { css } from '@emotion/react';

export default ({ children }) => (
  <div
    css={css`
      display: inline-block;
    `}
  >
    <div
      css={css`
        display: flex;
        align-items: center;
      `}
    >
      {children}
    </div>
  </div>
);
