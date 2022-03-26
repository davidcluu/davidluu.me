import { Fragment } from 'react';

import SEO from '../components/SEO';
import ClientOnly from '../components/ClientOnly';
import Landing from '../modules/Landing';

export default () => (
  <Fragment>
    <SEO title="Software Engineer" />
    <ClientOnly>
      <Landing />
    </ClientOnly>
  </Fragment>
);
