import { ClassNames } from '@emotion/react';

import Anchor from './Anchor';
import CopyrightFooter from '../../../components/CopyrightFooter';

export default () => (
  <ClassNames>
    {({ css, theme: { utils } }) => (
      <CopyrightFooter
        AnchorComponent={Anchor}
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
