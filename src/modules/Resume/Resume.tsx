import type { Theme } from '@emotion/react';
import { Fragment } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

import { MDXProvider } from '@mdx-js/react';

import ResumeAnchor from './ResumeAnchor';

import { resumePaddingSize, resumeWidthCss } from './styles';

import ResumeMDXDocument from './ResumeContent.mdx';

const fontColorCss = (props: { theme: Theme }) => css`
  ${props.theme.utils.getThemeVariantCSSWithFallback(
    'color',
    'resume.body.font-color'
  )}

  @media print {
    ${props.theme.utils.getThemeInvariantCSSWithFallback('color', 'dl-black-0')}
  }
`;

// Page wrapper

const wrapper = styled.main`
  ${resumeWidthCss}
`;

// Name

const h1 = styled.h1`
  margin: 0;

  text-align: center;
  ${({ theme: { utils } }) => utils.getBodyFontCSSWithFallback('bold')}
  ${fontColorCss}
`;

// Contact information

const h6 = styled.h6`
  margin: 0;

  text-align: center;
  ${({ theme: { utils } }) => utils.getBodyFontCSSWithFallback('normal')}
  font-size: 1rem;
  ${fontColorCss}
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
  ${fontColorCss}

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

const table = styled.table`
  margin: 0;
  border: 0;
  padding: 0;

  line-height: inherit;
`;

const thead = styled.thead`
  ${fontColorCss}
`;

const tbody = styled.tbody`
  ${fontColorCss}
`;

const tr = styled.tr`
  display: flex;
  justify-content: space-between;

  ${fontColorCss}
`;

const tableItem = styled.td`
  margin: 0;
  border: 0;
  padding: 0;

  ${({ theme: { utils } }) =>
    utils.getThemeInvariantCSSWithFallback('line-height', 'font.line-height')}
  ${fontColorCss}
`;

const th = tableItem;

const td = tableItem;

// Section item achievements

const ul = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

const li = styled.li`
  margin: 0;

  ${fontColorCss}
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

  ${fontColorCss}
`;

const a = ResumeAnchor;

const mdxComponents = {
  p,
  h1,
  h2,
  h6,
  ul,
  li,
  table,
  thead,
  tbody,
  tr,
  td,
  th,
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
            margin: ${resumePaddingSize};
          }
        }
      `}
    />
    <MDXProvider components={mdxComponents}>
      <ResumeMDXDocument />
    </MDXProvider>
  </Fragment>
);
