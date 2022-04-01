import { css } from '@emotion/react';

import ContentHeader from '../components/ContentHeader';

const Header = () => (
  <ContentHeader
    css={({ utils }) => css`
      margin-bottom: 1em;

      text-align: center;
      font-size: 2em;
      ${utils.getHeaderFontCSSWithFallback('bold')}
    `}
  >
    Get in Touch
  </ContentHeader>
);

export default Header;
