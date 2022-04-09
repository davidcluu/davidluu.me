import { useStaticQuery, graphql } from 'gatsby';
import Helmet from 'react-helmet';

interface ContentMeta {
  content: string;
}

interface NameContentMeta extends ContentMeta {
  name: string;
}

interface PropertyContentMeta extends ContentMeta {
  property: string;
}

interface SEOProps {
  description?: string;
  keywords?: string[];
  lang?: string;
  meta?: (NameContentMeta | PropertyContentMeta)[];
  title?: string;
}

const SEO = ({
  description: propDescription,
  keywords = [],
  lang = 'en',
  meta = [],
  title,
}: SEOProps) => {
  const {
    site: {
      siteMetadata: { description: defaultDescription, siteUrl, twitter },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          description
          siteUrl
          twitter
        }
      }
    }
  `);

  const description = propDescription || defaultDescription;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      defaultTitle="David Luu - Software Engineer"
      title={title}
      titleTemplate="%s | David Luu"
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: siteUrl,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:site_name',
          content: description,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:site',
          content: twitter,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        {
          name: 'twitter:creator',
          content: twitter,
        },
        {
          name: 'keywords',
          content: [...[], ...keywords].join(', '),
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
