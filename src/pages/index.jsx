import React, { Fragment } from 'react';

import Div100vh from 'react-div-100vh';

import SEO from '../components/SEO';
import LandingNavbar from '../modules/LandingNavbar';
import LandingAnimation from '../modules/LandingAnimation';

export default () => (
  <Fragment>
    <SEO title="Software Engineer, Web Developer" />
    <LandingNavbar />
    <LandingAnimation />
    <Div100vh />
    <Div100vh />
    <Div100vh />
  </Fragment>
);
