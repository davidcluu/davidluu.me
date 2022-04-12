import { Fragment } from 'react';

import m from '../../components/MDXComponents';

import data from './resume-json-ld';

const ResumeContentEducation = () => (
  <m.p>
    {data.hasCredential.educationalLevel}, Graduated{' '}
    {data.hasCredential.dateCreated} <m.br />
    {data.hasCredential.recognizedBy.name} <m.br />
    {data.hasCredential.aggregateRating.name}:{' '}
    {data.hasCredential.aggregateRating.ratingValue} /{' '}
    {data.hasCredential.aggregateRating.bestRating} <m.br />
    {data.hasCredential.award.map((award) => (
      <Fragment key={award}>
        {award}
        <m.br />
      </Fragment>
    ))}
  </m.p>
);

export default ResumeContentEducation;
