import { Fragment } from 'react';

import m from '../../components/MDXComponents';

import data from './resume-json-ld';

const ResumeContentWorkExperience = () =>
  [data.worksFor, ...data.alumniOf].map(
    ({
      name,
      location: {
        name: city,
        containedInPlace: { alternateName: state },
      },
      employee: {
        hasOccupation: {
          roleName,
          startDate,
          endDate,
          description: descriptions,
        },
      },
    }) => (
      <Fragment key={startDate + endDate}>
        <m.p>
          <m.strong>
            {name}, {city}, {state} | {roleName} | {startDate} to {endDate}
          </m.strong>
        </m.p>
        <m.ul>
          {descriptions.map((description) => (
            <m.li key={description}>{description}</m.li>
          ))}
        </m.ul>
      </Fragment>
    )
  );

export default ResumeContentWorkExperience;
