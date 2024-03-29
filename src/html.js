/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import PropTypes from 'prop-types';

import themeHtml from './theme/html';

const CHARSET = 'utf-8';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet={CHARSET} />
        <meta
          httpEquiv="Content-Type"
          content={`text/html; charset=${CHARSET}`}
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <div
          id="___theme-html"
          style={{ display: 'none' }}
          dangerouslySetInnerHTML={{
            __html: themeHtml,
          }}
        />
        {props.preBodyComponents}
        <div id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
