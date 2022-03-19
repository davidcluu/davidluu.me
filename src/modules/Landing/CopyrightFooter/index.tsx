import { ClassNames } from '@emotion/react';

import CopyrightFooter from '../../../components/CopyrightFooter';

export default () => (
  <ClassNames>
    {({ css, theme: { utils } }) => (
      <CopyrightFooter
        className={css`
          ${utils.getThemeVariantCSSWithFallback(
            'background-color',
            'landing.navbar.animationNotInViewport.background-color'
          )}
          ${utils.getThemeVariantCSSWithFallback(
            'color',
            'landing.navbar.animationNotInViewport.color'
          )}
        `}
      />
    )}
  </ClassNames>
);
