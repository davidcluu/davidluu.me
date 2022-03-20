import { Fragment } from 'react';

import Div100vh from 'react-div-100vh';

import Navbar from './Navbar';
import LandingAnimation from './Animation';
import About from './About';
import CopyrightFooter from './CopyrightFooter';

export default () => (
  <Fragment>
    <Navbar />
    <LandingAnimation />
    <About />
    <Div100vh style={{ backgroundColor: 'green' }} />
    <CopyrightFooter />
  </Fragment>
);
