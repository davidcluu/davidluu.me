import styled from '@emotion/styled';

import AutomaticNewTabAnchor from '../../components/AutomaticNewTabAnchor';

export default styled(AutomaticNewTabAnchor)`
  color: var(--resume--anchor--font-color);

  &:active,
  &:hover,
  &:visited {
    text-decoration: none;
  }

  @media print {
    &,
    &:active,
    &:hover,
    &:visited {
      text-decoration: none;
      color: var(--default--resume--body--font-color);
    }
  }
`;
