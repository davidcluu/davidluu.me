import styled from '@emotion/styled';

const ContentHeader = styled.h2`
  margin-bottom: 0.5em;

  font-size: 1.5em;
  ${({ theme: { utils } }) => utils.getBodyFontCSSWithFallback('normal')}
`;

export default ContentHeader;
