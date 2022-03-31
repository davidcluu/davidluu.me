import type { GatsbyNode } from 'gatsby';

import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import { forEach } from 'lodash/fp';

import { gatsbyEnvNodes, gatsbyEnvTypeDef } from './src/utils/env';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          resourceQuery: /raw/,
          type: 'asset/source',
        },
      ],
    },
    plugins: [new CaseSensitivePathsPlugin()],
  });
};

export const sourceNodes: GatsbyNode['sourceNodes'] = ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
}) => {
  forEach(
    createNode,
    gatsbyEnvNodes(['FORMSPREE_PROJECT_ID'], {
      createNodeId,
      createContentDigest,
    })
  );
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions: { createTypes } }) => {
    createTypes(gatsbyEnvTypeDef);
  };
