import type {
  ThemeInvariantConfigPath,
  ThemeVariantConfigPath,
} from './config';
import type { Leaves } from '../utils/object-paths/types';

import { get, replace } from 'lodash/fp';

import { isPath } from './config';

import { leaves } from '../utils/object-paths/objects';
import { mapToObject } from '../utils/lodash';

export const mapPathToCSSProperty = (leaf: string) =>
  `--${replace(/\./g, '--', leaf)}`;

export function mapPathToCssVariable(
  variablePath: ThemeVariantConfigPath | ThemeInvariantConfigPath,
  fallback?: string
): string {
  return `var(${mapPathToCSSProperty(variablePath)}${
    fallback ? `, ${fallback}` : ''
  })`;
}

export function mapPathToCSSValue<T>(object: T): (leaf: Leaves<T>) => string {
  return (leaf: Leaves<T>) => {
    // @ts-ignore
    const cssValueOrPath = get(leaf, object);
    if (isPath(cssValueOrPath)) {
      return mapPathToCssVariable(cssValueOrPath.path);
    }
    return cssValueOrPath as string;
  };
}

export function mapThemeConfigToCssObject(config: object) {
  const themeConfigLeaves = leaves(config, isPath);

  return mapToObject(
    mapPathToCSSProperty,
    // @ts-ignore
    mapPathToCSSValue(config)
  )(themeConfigLeaves);
}
