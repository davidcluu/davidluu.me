import type { ThemeVariantConfigValue } from './config';
import type { Leaves } from '../utils/object-paths/types';

import { get, replace } from 'lodash/fp';

import { isPath } from './config';

import { leaves } from '../utils/object-paths/objects';
import { mapToObject } from '../utils/lodash';

export const mapPathToCSSProperty = (leaf: string) =>
  `--${replace(/\./g, '--', leaf)}`;

export function getCSSValueOrPath<T>(
  object: T,
  leaf: Leaves<T>
): ThemeVariantConfigValue {
  // @ts-ignore
  return get(leaf, object);
}

export function mapPathToCSSValue<T>(object: T): (leaf: Leaves<T>) => string {
  return (leaf: Leaves<T>) => {
    // @ts-ignore
    const cssValueOrPath = getCSSValueOrPath(object, leaf);
    if (isPath(cssValueOrPath)) {
      return `var(${mapPathToCSSProperty(cssValueOrPath.path)})`;
    }
    return cssValueOrPath as string;
  };
}

export function mapThemeConfigToCssObject(config: object) {
  const themeConfigLeaves = leaves(config, isPath);

  return mapToObject(
    mapPathToCSSProperty,
    mapPathToCSSValue(config)
  )(themeConfigLeaves);
}
