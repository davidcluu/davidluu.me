import { graphql, useStaticQuery } from 'gatsby';
import { FormspreeProvider } from '@formspree/react';

const FormContextProvider = ({ children }) => {
  const {
    allEnv: {
      edges: {
        0: {
          node: { value: projectId },
        },
      },
    },
  } = useStaticQuery(graphql`
    query {
      allEnv(filter: { key: { eq: "FORMSPREE_PROJECT_ID" } }) {
        edges {
          node {
            value
          }
        }
      }
    }
  `);

  return <FormspreeProvider project={projectId}>{children}</FormspreeProvider>;
};

export default FormContextProvider;
