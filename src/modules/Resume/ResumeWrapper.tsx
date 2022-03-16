import type { SerializedStyles } from '@emotion/react';

import { css } from '@emotion/react';

import { resumePadding } from './styles';

const notPrint = (styles: SerializedStyles) => ({
  '@media not print': styles,
});

export default ({ children }) => (
  <div
    css={notPrint(css`
      display: flex;
      justify-content: center;

      background-color: var(--resume--background--background-color);
    `)}
  >
    <div
      css={notPrint(css`
        padding: ${resumePadding};
        margin: 2.5vh 0;

        background-color: var(--resume--page--background-color);
      `)}
    >
      {children}
    </div>
  </div>
);
