import type { MDXProviderComponents } from '@mdx-js/react';

import { MDXProvider } from '@mdx-js/react';
import styled from '@emotion/styled';
import { mapValues } from 'lodash/fp';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
SyntaxHighlighter.registerLanguage('json', json);

import Examples from './Examples';
import PromptMDX from './Prompt.mdx';

import { withLevelContingentRenderingContext } from '../context/LevelContingentRendering';

const code = ({ className, ...props }) => {
  // TODO light/dark mode styles
  const lightMode = true;

  const style = lightMode
    ? require('react-syntax-highlighter/dist/esm/styles/prism/one-light')
        .default
    : require('react-syntax-highlighter/dist/esm/styles/prism/one-dark')
        .default;

  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter
      {...props}
      language={match[1]}
      style={style}
      showLineNumbers
      showInlineLineNumbers
    />
  ) : (
    <code {...props} />
  );
};

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
  pre: styled.pre``,
  code,
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
