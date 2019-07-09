import React from 'react';
import { css } from '@emotion/core';

import { useWindowScroll, useWindowSize } from 'react-use';

import DarkModeToggle from '../../components/DarkModeToggle';

const LandingMenuBar = () => {
  const { height } = useWindowSize();
  const { y } = useWindowScroll();

  const landingAnimationVisible = y < height;

  return (
    <section
      css={({ navbar: { backgroundColorLanding, backgroundColor } }) => css`
        padding: 0 10px;
        width: 100%;
        height: 60px;
        position: fixed;

        z-index: 9999;
        display: flex;
        justify-content: space-between;
        align-items: center;

        transition: background-color 0.1s ease 0s;

        background-color: ${landingAnimationVisible
          ? backgroundColorLanding
          : backgroundColor};
      `}
    >
      <div>{/* TODO Put logo here */}</div>
      <div>
        <DarkModeToggle />
      </div>
    </section>
  );
};

export default LandingMenuBar;
