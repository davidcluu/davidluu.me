import { Fragment } from 'react';

import Div100vh from 'react-div-100vh';

import Navbar from './Navbar';
import LandingAnimation from './Animation';
import CopyrightFooter from './CopyrightFooter';

export default () => (
  <Fragment>
    <Navbar />
    <LandingAnimation />
    <Div100vh style={{ backgroundColor: 'green' }} />
    <CopyrightFooter />
  </Fragment>
);
