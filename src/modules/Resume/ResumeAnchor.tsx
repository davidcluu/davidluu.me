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
    ${(props) =>
      props.theme.utils.getThemeInvariantCSSWithFallback('color', 'dl-black-0')}

    text-decoration: none;
  }
`;
