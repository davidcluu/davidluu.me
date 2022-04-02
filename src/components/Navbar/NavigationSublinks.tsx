import { css } from '@emotion/react';

const NavigationSublinkBracket = (props) => (
  <div
    css={css`
      font-size: 1.25em;
    `}
    {...props}
  />
);

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
      <NavigationSublinkBracket>[</NavigationSublinkBracket>
      {children}
      <NavigationSublinkBracket>]</NavigationSublinkBracket>
    </div>
  </div>
);
