import type { Theme } from '@emotion/react';
import { Fragment } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

import { MDXProvider } from '@mdx-js/react';

import ResumeAnchor from './ResumeAnchor';

import { resumePageCss } from './styles';

import ResumeMDXDocument from './ResumeContent.mdx';

const fontCss = (props: { theme: Theme }) => css`
  ${props.theme.utils.getThemeVariantCSSWithFallback(
    'color',
    'resume.body.font-color'
  )}

  @media print {
    ${props.theme.utils.getThemeInvariantCSSWithFallback('color', 'dl-black-0')}

    ${props.theme.utils.getThemeInvariantCSSWithFallback(
      'font-family',
      'font.body.font-family',
      'Calibri, ',
      ' !important'
    )}
    line-height: 1.1rem !important;
  }
`;

// Page wrapper

const wrapper = (props: any) => (
  <main
    {...props}
    itemScope
    itemType="https://schema.org/Person"
    css={css`
      ${resumePageCss};

      & .anchor {
        display: none;
      }
    `}
  ></main>
);

// Name

const h1 = styled.h1`
  margin: 0 0 0.25rem;

  text-align: center;
  ${({ theme: { utils } }) => utils.getBodyFontCSSWithFallback('bold')}
  ${fontCss}
`;

// Contact information

const h6 = styled.h6`
  margin: 0;

  text-align: center;
  ${({ theme: { utils } }) => utils.getBodyFontCSSWithFallback('normal')}
  font-size: 1rem;
  ${fontCss}
`;

// Section header

const h2BorderBottomPrefix = '2px solid';

const h2 = styled.h2`
  margin: 0;
  ${(props) =>
    props.theme.utils.getThemeVariantCSSWithFallback(
      'border-bottom',
      'resume.body.font-color',
      h2BorderBottomPrefix
    )}

  ${({ theme: { utils } }) => utils.getBodyFontCSSWithFallback('bold')}
  ${fontCss}

  @media print {
    ${(props) =>
      props.theme.utils.getThemeInvariantCSSWithFallback(
        'border-bottom',
        'dl-black-0',
        h2BorderBottomPrefix
      )}
  }
`;

// Section item header

const h3 = styled.h3`
  margin: 0;

  ${({ theme: { utils } }) => utils.getBodyFontCSSWithFallback('bold')}
  font-size: 1rem;
  ${fontCss}
`;

// Section item achievements

const ul = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

const li = styled.li`
  margin: 0;

  ${fontCss}
`;

// Section item divider

const hr = styled.hr`
  margin: 0 0 0.5rem;
  border: 0;
  padding: 0;

  height: 0;
  width: 100%;
`;

// Generic text

const p = styled.p`
  margin: 0;

  ${fontCss}
`;

const a = styled(ResumeAnchor)`
  @media print {
    ${fontCss}
  }
`;

const mdxComponents = {
  p,
  h1,
  h2,
  h3,
  h6,
  ul,
  li,
  hr,
  a,
  wrapper,
};

export default () => (
  <Fragment>
    <Global
      styles={css`
        @media print {
          @page {
            size: auto;
            margin: 0;
          }
        }
      `}
    />
    <MDXProvider components={mdxComponents}>
      <ResumeMDXDocument />
    </MDXProvider>
  </Fragment>
);
