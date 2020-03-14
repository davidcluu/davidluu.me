const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  siteMetadata: {
    title: 'David Luu',
    description: 'David Luu - Software Engineer, Web Developer',
    author: '@davidcluu',
    email: 'luu.david.c@gmail.com',
    url: 'https://davidluu.me',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`,
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-graphql-loader',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'David Luu - Software Engineer, Web Developer',
        short_name: 'David Luu',
        start_url: '/',
        background_color: '#38DDD4',
        theme_color: '#38DDD4',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: './src/config/typography',
      },
    },
    'gatsby-transformer-sharp',
  ],
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      createProxyMiddleware({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    );
  },
};
