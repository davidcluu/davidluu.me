import { Fragment } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';

import { MDXProvider } from '@mdx-js/react';

import ResumeAnchor from './ResumeAnchor';

import {
  resumeBackgroundFontColor,
  resumePaddingSize,
  resumeWidthCss,
} from './styles';
import {
  baseFontSizeCss,
  baseLineHeightCss,
  bodyFontNormalCss,
  bodyFontBoldCss,
} from '../../config/typography';

import ResumeMDXDocument from './ResumeContent.mdx';

const bodyFontColorCss = css`
  color: ${resumeBackgroundFontColor};

  @media print {
    color: var(--default--resume--body--font-color);
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
  ${bodyFontBoldCss}
  ${bodyFontColorCss}
`;

// Contact information

const h6 = styled.h6`
  margin: 0;

  text-align: center;
  ${baseFontSizeCss}
  ${bodyFontNormalCss}
  ${bodyFontColorCss}
`;

// Section header

const h2 = styled.h2`
  margin: 0;
  border-bottom: 2px solid ${resumeBackgroundFontColor};

  ${bodyFontBoldCss}
  ${bodyFontColorCss}

  @media print {
    border-bottom: 2px solid var(--default--resume--body--font-color);
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
  ${bodyFontColorCss}
`;

const tbody = styled.tbody`
  ${bodyFontColorCss}
`;

const tr = styled.tr`
  display: flex;
  justify-content: space-between;

  ${bodyFontColorCss}
`;

const tableItem = styled.td`
  margin: 0;
  border: 0;
  padding: 0;

  ${baseLineHeightCss};
  ${bodyFontColorCss}
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

  ${bodyFontColorCss}
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

  ${bodyFontColorCss}
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
