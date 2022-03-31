import { css } from '@emotion/react';

import ContentHeader from '../components/ContentHeader';

import { headerFontBoldCss } from '../../../config/typography';

const Header = () => (
  <ContentHeader
    css={css`
      margin-bottom: 1em;

      text-align: center;
      font-size: 2em;
      ${headerFontBoldCss}
    `}
  >
    Get in Touch
  </ContentHeader>
);

export default Header;
