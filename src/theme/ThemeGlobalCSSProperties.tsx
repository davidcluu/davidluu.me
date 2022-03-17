import type { Leaves } from '../utils/object-paths/types';

import { css, Global } from '@emotion/react';
import { get, replace } from 'lodash/fp';

import themeConfig, { isPath } from './theme-config';
import { lightModeClassName, darkModeClassName } from './constants';

import { leaves } from '../utils/object-paths/objects';
import { mapToObject } from '../utils/lodash';

const mapLeafToCSSProperty = (leaf: string) =>
  `--${replace(/\./g, '--', leaf)}`;

function mapLeafToCSSValue<T>(object: T): (leaf: Leaves<T>) => string {
  return (leaf: Leaves<T>) => {
    // @ts-ignore
    const cssValueOrPath = get(leaf, object);
    if (isPath(cssValueOrPath)) {
      return `var(${mapLeafToCSSProperty(cssValueOrPath.path)})`;
    }
    return cssValueOrPath;
  };
}

function mapThemeConfigToCss(config: object) {
  const themeConfigLeaves = leaves(config, isPath);

  return mapToObject(
    mapLeafToCSSProperty,
    mapLeafToCSSValue(config)
  )(themeConfigLeaves);
}

export default () => (
  <Global
    styles={css`
      // Theme-invariant properties
      body {
        ${mapThemeConfigToCss(themeConfig.themeInvariant)}
      }

      // Theme-dependent properties
      body,
      body.${lightModeClassName} {
        ${mapThemeConfigToCss(themeConfig.lightMode)}
      }
      body.${darkModeClassName} {
        ${mapThemeConfigToCss(themeConfig.darkMode)}
      }
    `}
  />
);
