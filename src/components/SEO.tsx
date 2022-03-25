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
  lang?: string;
  meta?: (NameContentMeta | PropertyContentMeta)[];
  keywords?: string[];
  title: string;
}

const SEO = ({ lang = 'en', meta = [], keywords = [], title }: SEOProps) => {
  const {
    site: {
      siteMetadata: {
        title: titleTemplatePrefix,
        description,
        siteUrl,
        twitter,
      },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
          twitter
        }
      }
    }
  `);

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
