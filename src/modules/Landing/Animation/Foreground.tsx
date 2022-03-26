import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import Beach from './Beach';
import Sun from './Sun';
import Clouds from './Clouds';
import Waves from './Waves';

import ClientOnly from '../../../components/ClientOnly';

import useViewportHeight from '../hooks/use-viewport-height';

const PlaceholderComponent = styled.div`
  width: 100%;
  height: 100vh;

  ${(props) =>
    props.theme.utils.getThemeVariantCSSWithFallback(
      'background-color',
      'landing.animation.sky.initial.background-color'
    )}
`;

export default () => {
  const {
    utils: { getThemeInvariantCSSValue, cssValueTransformers },
  } = useTheme();
  const viewportHeight = useViewportHeight();
  const navbarHeight = getThemeInvariantCSSValue(
    'navbar.desktop.height',
    cssValueTransformers.pixelToNumber
  );

  const height = viewportHeight - navbarHeight;

  return (
    <ClientOnly PlaceholderComponent={PlaceholderComponent}>
      <div
        data-label="Foreground"
        style={{ height }}
        css={({ utils }) => css`
          ${utils.getThemeInvariantCSSWithFallback(
            'margin-top',
            'navbar.desktop.height'
          )}

          position: relative;
          overflow: hidden;

          background: transparent;
        `}
      >
        <Sun />
        <Clouds />
        <Waves />
        <Beach />
      </div>
    </ClientOnly>
  );
};
