import { Fragment } from 'react';

import Navbar from './Navbar';
import LandingAnimation from './Animation';
import About from './About';
import Contact from './Contact';
import CopyrightFooter from './CopyrightFooter';

export default () => (
  <Fragment>
    <Navbar />
    <LandingAnimation />
    <About />
    <Contact />
    <CopyrightFooter />
  </Fragment>
);
