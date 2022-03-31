import type { NodeInput } from 'gatsby';

import { compose, map, uniq } from 'lodash/fp';

const ENV_TYPE = 'Env';

const KEY_FIELD = 'key';
const VALUE_FIELD = 'value';

export const gatsbyEnvNodes = (
  keys: string[],
  {
    createNodeId,
    createContentDigest,
  }: {
    createNodeId: (input: string) => string;
    createContentDigest: (input: string | object) => string;
  }
): NodeInput[] => {
  return compose(
    map<string, NodeInput>((key) => ({
      [KEY_FIELD]: key,
      [VALUE_FIELD]: process.env[key],

      id: createNodeId(`${ENV_TYPE}-${key}`),
      parent: null,
      children: [],
      internal: {
        type: ENV_TYPE,
        contentDigest: createContentDigest(process.env[key] || ''),
      },
    })),
    uniq
  )(keys);
};

export const gatsbyEnvTypeDef = `
  type ${ENV_TYPE} implements Node @dontInfer {
    ${KEY_FIELD}: String
    ${VALUE_FIELD}: String
  }
`;
