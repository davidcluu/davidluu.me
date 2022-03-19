import styled from '@emotion/styled';

import AutomaticNewTabAnchor from '../../../components/AutomaticNewTabAnchor';

export default styled(AutomaticNewTabAnchor)`
  ${(props) =>
    props.theme.utils.getThemeVariantCSSWithFallback(
      'color',
      'landing.navbar.animationNotInViewport.color'
    )}

  &:active,
  &:hover,
  &:visited {
    text-decoration: none;
  }
`;
