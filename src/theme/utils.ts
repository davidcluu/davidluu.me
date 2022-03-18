import type { Leaves } from '../utils/object-paths/types';

import { get } from 'lodash/fp';

import { isPath } from './config';

export function resolvePathToCSSValue<T, S>(
  object: T,
  sourceObject: S,
  leaf: Leaves<T>
): string {
  // @ts-ignore
  const cssValueOrPath = get(leaf, object);
  if (isPath(cssValueOrPath)) {
    // @ts-ignore
    return resolvePathToCSSValue(
      sourceObject,
      sourceObject,
      // @ts-ignore
      cssValueOrPath.path
    );
  }
  return cssValueOrPath as string;
}
