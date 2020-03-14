import React from 'react';
import { useQuery } from '@apollo/client';

import query from './test.gql';

export default () => {
  const { data, loading, error } = useQuery(query);

  console.log(data, loading, error);

  return loading ? null : `foo = ${data.hello.foo} baz = ${data.hello.baz}`;
};
