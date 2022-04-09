import { Fragment } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { css } from '@emotion/react';

import SEO from '../components/SEO';
import CopyrightFooter from '../components/CopyrightFooter';
import Navbar from '../components/Navbar';

import typography from '../config/typography';

interface QueryData {
  mdx: {
    body: string;
    excerpt: string;
    timeToRead: number;
    frontmatter: {
      displayDate: string;
      datetimeValue: string;
      title: string;
    };
  };
}

export const pageQuery = graphql`
  query MyQuery($id: String!) {
    mdx(id: { eq: $id }) {
      body
      excerpt(pruneLength: 160)
      timeToRead
      frontmatter {
        datetimeValue: date(formatString: "YYYY-MM-DD")
        displayDate: date(formatString: "MMMM D, YYYY")
        title
      }
    }
  }
`;

interface BlogPostProps {
  data: QueryData;
}

const BlogPost = ({
  data: {
    mdx: {
      body,
      excerpt,
      timeToRead,
      frontmatter: { datetimeValue, displayDate, title },
    },
  },
}: BlogPostProps) => (
  <Fragment>
    <SEO title={title} description={excerpt} />
    <Navbar />
    <div
      css={css`
        margin: 0 auto;
        max-width: ${typography.rhythm(24)};
        padding: 0 ${typography.rhythm(3 / 4)};
      `}
    >
      <main>
        <article itemScope itemType="http://schema.org/Article">
          <header>
            <h1 itemProp="headline">{title}</h1>
            <p>
              <time dateTime={datetimeValue}>{displayDate}</time> --{' '}
              {timeToRead} min read
            </p>
          </header>
          <MDXRenderer>{body}</MDXRenderer>
        </article>
      </main>
    </div>
    <CopyrightFooter />
  </Fragment>
);

export default BlogPost;
