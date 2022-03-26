import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    author: 'David Luu',
    title: 'David Luu',
    description: 'David Luu - Software Engineer',
    siteUrl: 'https://davidluu.me',
    twitter: '@davidcluu',
    github: 'davidcluu',
  },
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-humans-txt',
      options: {
        metaTag: false,
        header: 'davidluu.me',
        team: [
          {
            Owner: 'David Luu',
            GitHub: 'davidcluu',
          },
        ],
        thanks: undefined,
        site: {
          Standards: 'HTML5, CSS3',
          Components: 'React, Gatsby, Emotion, Redux',
          Softwares: 'Visual Studio Code',
        },
        note: undefined,
      },
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    { resolve: 'gatsby-plugin-robots-txt', options: { policy: [] } },
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/config/typography',
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
    },
  ],
};

export default config;
