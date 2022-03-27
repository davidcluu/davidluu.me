import { MDXProvider } from '@mdx-js/react';
import styled from '@emotion/styled';

import Examples from './Examples';

import PromptMDX from './Prompt.mdx';

const wrapper = styled.div`
  margin: 1%;
`;

const p = styled.p`
  margin: 0;
`;

const h1 = styled.h1`
  margin: 0 0 0.25em;
`;

const ul = styled.ul`
  margin-bottom: 0;
`;

const li = styled.li`
  margin-bottom: 0;
`;

const pre = styled.pre`
  margin: 0.5em 0;
  padding: 0.5em;

  background-color: #f2f2f2;
`;

const code = styled.code``;

const components = { wrapper, p, h1, ul, li, pre, code };

export default () => (
  <MDXProvider components={components}>
    <PromptMDX />
    <Examples />
  </MDXProvider>
);
