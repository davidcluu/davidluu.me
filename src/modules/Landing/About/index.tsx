import { MDXProvider } from '@mdx-js/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import AutomaticNewTabAnchor from '../../../components/AutomaticNewTabAnchor';

import IDs from '../../../components/Navbar/ids';
import { bodyFontNormalCss } from '../../../config/typography';

import AboutMDXDocument from './AboutContent.mdx';

// Page wrapper

const wrapper = (props: any) => (
  <section
    css={css`
      margin: 0 auto;
      padding: 5em 0;
      width: 750px;

      text-align: left;
    `}
    {...props}
    id={IDs.About}
  />
);
// Text elements

const h2 = styled.h2`
  margin-bottom: 0.5em;

  font-size: 1.5em;
  ${bodyFontNormalCss}
`;

const p = styled.p`
  margin-bottom: 0.25em;

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

const hr = styled.hr`
  margin: 0;
  height: auto;
  width: 100%;

  display: block;

  background-color: transparent;

  &:after {
    content: '•••••';

    margin: 1em 0;

    display: block;

    text-align: center;
    letter-spacing: 0.5em;
    font-size: 1.25em;
    color: #ccc;
  }
`;

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
