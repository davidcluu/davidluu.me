import { Fragment } from 'react';

import { formatDistanceToNowStrict } from 'date-fns';

const LouieAge = () => (
  <Fragment>
    {formatDistanceToNowStrict(new Date('12/30/2021'), {
      roundingMethod: 'floor',
    }).replace(/s$/, '')}{' '}
    old
  </Fragment>
);

export default LouieAge;
