import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import { GLOBAL_KEYWORDS } from '../config/SEO';

const PAGE_QUERY = graphql`
  query {
    site {
      siteMetadata {
        author
        description
        title
      }
    }
  }
`;

const SEO = ({ description, lang, meta, keywords, title }) => {
  const {
    site: {
      siteMetadata: {
        author,
        description: defaultDescription,
        title: titleTemplatePrefix,
      },
    },
  } = useStaticQuery(PAGE_QUERY);

  const metaDescription = description || defaultDescription;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      titleTemplate={`${titleTemplatePrefix} - %s`}
      title={title}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'keywords',
          content: [...GLOBAL_KEYWORDS, ...keywords].join(', '),
        },
      ].concat(meta)}
    />
  );
};

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
  description: '',
};

const HelmetMetaPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
});

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(HelmetMetaPropType),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;
