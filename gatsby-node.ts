import type { GatsbyNode } from 'gatsby';

import { createFilePath } from 'gatsby-source-filesystem';
import nodePath from 'path';
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

export const onCreateNode: GatsbyNode['onCreateNode'] = ({
  node,
  actions,
  getNode,
}) => {
  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({ node, getNode, basePath: 'blog' });

    actions.createNodeField({
      name: 'slug',
      node,
      value: slug,
    });

    actions.createNodeField({
      name: 'path',
      node,
      value: `/blog${slug}`,
    });
  }
};

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
}) => {
  const result = await graphql<{
    allMdx: {
      nodes: [
        {
          id: string;
          fields: {
            path: string;
          };
        }
      ];
    };
  }>(`
    query {
      allMdx {
        nodes {
          id
          fields {
            path
          }
        }
      }
    }
  `);

  result.data?.allMdx.nodes.forEach(({ id, fields: { path } }) => {
    actions.createPage({
      path,
      component: nodePath.resolve('./src/templates/BlogPost.tsx'),
      context: { id },
    });
  });
};
