import type { GatsbyConfig } from 'gatsby';

import 'dotenv/config';

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
        routeChangeEventName: 'davidluu.me.route_change',
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
    'gatsby-plugin-mdx',
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
