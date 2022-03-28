import type { MDXProviderComponents } from '@mdx-js/react';

import { MDXProvider } from '@mdx-js/react';
import styled from '@emotion/styled';
import { mapValues } from 'lodash/fp';

import Examples from './Examples';
import PromptMDX from './Prompt.mdx';

import { withLevelContingentRenderingContext } from '../context/LevelContingentRendering';

const components: MDXProviderComponents = mapValues(
  withLevelContingentRenderingContext
)({
  wrapper: styled.div`
    margin: 1%;
  `,
  p: styled.p`
    margin: 0;
  `,
  br: styled.br``,
  h1: styled.h1`
    margin: 0 0 0.25em;
  `,
  h2: styled.h2``,
  h3: styled.h3``,
  h4: styled.h4``,
  h5: styled.h5``,
  h6: styled.h6``,
  strong: styled.strong``,
  em: styled.em``,
  blockquote: styled.blockquote``,
  ol: styled.ol``,
  ul: styled.ul`
    margin-bottom: 0;
  `,
  li: styled.li`
    margin-bottom: 0;
  `,
  pre: styled.pre`
    margin: 0.5em 0;
    padding: 0.5em;

    background-color: #f2f2f2;
  `,
  code: styled.code``,
  hr: styled.hr``,
  a: styled.a``,
  img: styled.img``,
});

export default () => (
  <MDXProvider components={components}>
    <PromptMDX />
    <Examples />
  </MDXProvider>
);
