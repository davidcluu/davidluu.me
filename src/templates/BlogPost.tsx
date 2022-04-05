import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

interface QueryData {
  mdx: {
    body: string;
    frontmatter: {
      date: string;
      title: string;
    };
  };
}

export const pageQuery = graphql`
  query MyQuery($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        date(formatString: "M-D-YYYY")
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
      frontmatter: { title, date },
    },
  },
}: BlogPostProps) => (
  <article>
    <header>
      <h1>{title}</h1>
      <p>{date}</p>
    </header>
    <MDXRenderer>{body}</MDXRenderer>
    <footer></footer>
  </article>
);

export default BlogPost;
