import { css, Global } from '@emotion/react';

import { darkModeClassName } from './constants';

export default (): JSX.Element => (
  <Global
    styles={css`
      // Theme-invariant properties
      body {
        --theme-blue: #acf8fc;

        --default--resume--page--background-color: #ffffff;
        --default--resume--body--font-color: #000000;
      }

      // Theme-dependent properties
      body {
        --resume--background--background-color: #ebebeb;
        // prettier-ignore
        --resume--page--background-color: var(--default--resume--page--background-color);
        --resume--body--font-color: var(--default--resume--body--font-color);
        --resume--anchor--font-color: #0066cc;
      }
      body.${darkModeClassName} {
        --resume--background--background-color: #212121;
        --resume--page--background-color: #181818;
        --resume--body--font-color: #ffffff;
        --resume--anchor--font-color: var(--theme-blue);
      }
    `}
  />
);
