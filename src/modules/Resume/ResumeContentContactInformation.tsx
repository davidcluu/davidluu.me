import { Fragment } from 'react';

import m from '../../components/MDXComponents';

import data from './resume-json-ld';

const ResumeContentContactInformation = () => (
  <Fragment>
    <m.h1>{data.name}</m.h1>
    <m.h6>
      {data.homeLocation.name},{' '}
      {data.homeLocation.containedInPlace.alternateName} | {data.telephone} |{' '}
      <m.a href={`mailto:${data.email}`}>{data.email}</m.a> |{' '}
      <m.a href={data.url}>{data.url}</m.a>
    </m.h6>
  </Fragment>
);

export default ResumeContentContactInformation;
