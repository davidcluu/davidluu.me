import { map, zipObject } from 'lodash/fp';

export const mapToObject =
  <T, V>(keyMapper: (obj: T) => string, valueMapper: (obj: T) => V) =>
  (objs: T[]) =>
    zipObject(map(keyMapper, objs), map(valueMapper, objs));
