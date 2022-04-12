import { Fragment } from 'react';

import m from '../../components/MDXComponents';

import data from './resume-json-ld';

const ResumeContentContactInformation = () => (
  <Fragment>
    <m.h1>{data.name}</m.h1>
    <m.h6>
      {data.homeLocation.name},{' '}
      {data.homeLocation.containedInPlace.alternateName} |&nbsp;
      <m.strong>Phone:</m.strong> {data.telephone} |&nbsp;
      <m.strong>Email:</m.strong>{' '}
      <m.a href={`mailto:${data.email}`}>{data.email}</m.a> |&nbsp;
      <m.strong>Website:</m.strong>{' '}
      <m.a href={`https://${data.url}`}>{data.url}</m.a>
    </m.h6>
  </Fragment>
);

export default ResumeContentContactInformation;
