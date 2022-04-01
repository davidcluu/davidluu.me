import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import AutomaticNewTabAnchor from '../../../components/AutomaticNewTabAnchor';
import ContentWrapper from '../components/ContentWrapper';
import ContentHeader from '../components/ContentHeader';
import ContentHr from '../components/ContentHr';

import IDs from '../../../components/Navbar/ids';

import AboutMDXDocument from './AboutContent.mdx';

// Page wrapper

const wrapper = ({ children, ...props }: any) => (
  <ContentWrapper
    css={({ utils }) => css`
      ${utils.getThemeVariantCSSWithFallback(
        'background-color',
        'landing.evenIndexedContent.background-color'
      )}
      ${utils.getThemeVariantCSSWithFallback('color', 'landing.font-color')}
      text-align: left;
    `}
    {...props}
    id={IDs.About}
  >
    <div
      css={css`
        width: 750px;
      `}
    >
      {children}
    </div>
  </ContentWrapper>
);

// Text elements

const h2 = ContentHeader;

const p = styled.p`
  margin-bottom: 0.5em;

  font-size: 1.1em;

  &:last-child {
    margin: 0;
  }
`;

const ul = styled.ul`
  margin: 0 0 0 1.2em;

  list-style-type: none;

  font-size: 1.1em;
`;

const li = styled.li`
  margin: 0.5em 0 0;

  & > ${ul} {
    font-size: 0.95em;
  }
`;

const a = styled(AutomaticNewTabAnchor)`
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

const hr = ContentHr;

const mdxComponents = {
  p,
  h2,
  ul,
  li,
  a,
  hr,
  wrapper,
};

export default () => (
  <MDXProvider components={mdxComponents}>
    <AboutMDXDocument />
  </MDXProvider>
);
