export const typeDef = `
  extend type Query {
    hello: Hello
  }

  type Hello {
    foo: String
    baz: String
  }
`;
export const resolvers = {
  Query: {
    hello: () => ({}),
  },
  Hello: {
    foo: () => 'bar',
    baz: () => 'qux',
  },
};
