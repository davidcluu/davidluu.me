/* eslint-disable react/no-danger */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';

import { LOCAL_STORAGE_KEY, LIGHT_MODE, DARK_MODE } from './config/dark-mode';

export default function HTML({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  body,
  postBodyComponents,
}) {
  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {headComponents}
      </head>
      <body {...bodyAttributes} className={LIGHT_MODE}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              window.__onThemeChange = function() {};
              window.__setTheme = function(newTheme) {
                window.__theme = newTheme;
                document.body.className = newTheme;

                try {
                  localStorage.setItem('${LOCAL_STORAGE_KEY}', newTheme);
                } catch (err) {}

                window.__onThemeChange(newTheme);
              }

              var preferredTheme = '${LIGHT_MODE}';
              try {
                preferredTheme = localStorage.getItem('${LOCAL_STORAGE_KEY}');
              } catch (err) {}

              var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
              darkQuery.addListener(function(e) {
                window.__setTheme(e.matches ? '${DARK_MODE}' : '${LIGHT_MODE}')
              });

              window.__setTheme(preferredTheme || (darkQuery.matches ? '${DARK_MODE}' : '${LIGHT_MODE}'));
            })()
            `,
          }}
        />
        {preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
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
