import styled from '@emotion/styled';

import AutomaticNewTabAnchor from '../../components/AutomaticNewTabAnchor';

export default styled(AutomaticNewTabAnchor)`
  ${(props) =>
    props.theme.utils.getThemeVariantCSSWithFallback(
      'color',
      'resume.anchor.font-color'
    )}

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
      ${(props) =>
        props.theme.utils.getThemeInvariantCSSWithFallback(
          'color',
          'default.resume.body.font-color'
        )}
    }
  }
`;
