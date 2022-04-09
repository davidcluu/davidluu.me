import type { GatsbyConfig } from 'gatsby';

import 'dotenv/config';

const config: GatsbyConfig = {
  siteMetadata: {
    author: 'David Luu',
    description: 'David Luu - Software Engineer',
    siteUrl: 'https://davidluu.me',
    twitter: '@davidcluu',
    github: 'davidcluu',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: './src/blog/',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
    },
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        // GTM script variables
        id: process.env.GOOGLE_TAG_MANAGER_ID,
        gtmAuth: process.env.GOOGLE_TAG_MANAGER_ENVIRONMENT_AUTH_STRING,
        gtmPreview: process.env.GOOGLE_TAG_MANAGER_ENVIRONMENT_PREVIEW_NAME,
        // Data layer configuration
        dataLayerName: 'dataLayer',
        defaultDataLayer: {},
        // Plugin-specific configuration
        includeInDevelopment: true,
        routeChangeEventName: 'gatsby-route-change',
        enableWebVitalsTracking: false,
      },
    },
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
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 600,
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    { resolve: 'gatsby-plugin-robots-txt', options: { policy: [] } },
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/config/typography',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
    },
    'gatsby-transformer-sharp',
  ],
};

export default config;
