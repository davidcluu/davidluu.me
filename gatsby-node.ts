import type { GatsbyNode } from 'gatsby';

import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';

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
