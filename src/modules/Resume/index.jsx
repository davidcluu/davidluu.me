import React, { Fragment } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';
import { branch, withProps } from 'recompose';

import { MDXProvider } from '@mdx-js/react';

import {
  baseFontColor,
  baseFontSize,
  baseLineHeight,
  bodyFontNormalCss,
  headerFontBoldCss,
} from '../../config/typography';

import ResumeMDXDocument from './resume.mdx';

// Page wrapper

const wrapper = styled.main`
  width: 850px;
`;

// Name

const h1 = styled.h1`
  margin: 0;

  text-align: center;
  ${headerFontBoldCss}
`;

// Contact information

const h6 = styled.h6`
  margin: 0;

  text-align: center;
  ${baseFontSize};
  ${bodyFontNormalCss}
`;

// Section header

const h2 = styled.h2`
  margin: 0;
  border-bottom: 2px solid #000;

  ${headerFontBoldCss}
`;

// Section item header

const table = styled.table`
  margin: 0;
  border: 0;
  padding: 0;
`;

const thead = styled.thead``;

const tbody = styled.tbody``;

const tr = styled.tr`
  display: flex;
  justify-content: space-between;
`;

const tableItem = styled.td`
  margin: 0;
  border: 0;
  padding: 0;

  ${baseLineHeight};
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
`;

const a = branch(
  ({ href }) => !href || !href.startsWith('mailto:'),
  withProps({
    target: '_blank',
    rel: 'noopener noreferrer',
  })
)(styled.a``);

const components = {
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

const Resume = () => {
  return (
    <Fragment>
      <Global
        styles={css`
          @media print {
            a {
              text-decoration: none;
              ${baseFontColor}
            }
          }
        `}
      />
      <MDXProvider components={components}>
        <ResumeMDXDocument />
      </MDXProvider>
    </Fragment>
  );
};

export default Resume;
