import { Fragment } from 'react';
import Div100vh from 'react-div-100vh';

import Navbar from './Navbar';
import LandingAnimation from './Animation';
import About from './About';
import CopyrightFooter from './CopyrightFooter';

import ClientOnly from '../../components/ClientOnly';

export default () => (
  <Fragment>
    <Navbar />
    <ClientOnly>
      <LandingAnimation />
    </ClientOnly>
    <About />
    <Div100vh style={{ backgroundColor: 'green' }} />
    <CopyrightFooter />
  </Fragment>
);
