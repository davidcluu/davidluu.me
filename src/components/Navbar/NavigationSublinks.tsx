import { css } from '@emotion/react';
import styled from '@emotion/styled';

const SublinkBracket = styled.span`
  user-select: none;

  line-height: 1em;
`;

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
      <SublinkBracket>[</SublinkBracket>
      {children}
      <SublinkBracket>]</SublinkBracket>
    </div>
  </div>
);
