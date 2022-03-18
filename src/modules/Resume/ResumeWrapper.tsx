import type { SerializedStyles } from '@emotion/react';

import { css } from '@emotion/react';

import { resumePaddingSize } from './styles';

const notPrint = (styles: SerializedStyles) => ({
  '@media not print': styles,
});

export default ({ children }) => (
  <div
    css={(props) =>
      notPrint(css`
        display: flex;
        justify-content: center;

        ${props.utils.getThemeVariantCSSWithFallback(
          'background-color',
          'resume.background.background-color'
        )}
      `)
    }
  >
    <div
      css={(props) =>
        notPrint(css`
          padding: ${resumePaddingSize};
          margin: 2.5vh 0;

          ${props.utils.getThemeVariantCSSWithFallback(
            'background-color',
            'resume.page.background-color'
          )}
        `)
      }
    >
      {children}
    </div>
  </div>
);
