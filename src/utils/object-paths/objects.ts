import { Leaves } from './types';

import { isObject, compose, keys, forEach, F } from 'lodash/fp';

export function leaves<T>(
  object: T,
  shouldIgnore: (object: any) => boolean = F
): Leaves<T>[] {
  type LeafType = Leaves<T>;
  const result: LeafType[] = [];

  (function recurse(obj: any, pathAcc: string) {
    if (isObject(obj) && !shouldIgnore(obj)) {
      return compose(
        forEach((key: string) => {
          recurse(obj[key], pathAcc ? `${pathAcc}.${key}` : key);
        }),
        keys
      )(obj);
    }
    // @ts-ignore
    result.push(pathAcc as Leaves<T>);
  })(object, '');

  return result;
}
