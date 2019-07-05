import React, { Fragment } from 'react';

import SEO from '../components/SEO';
import LandingAnimation from '../modules/LandingAnimation';

import Div100vh from 'react-div-100vh';
import DarkModeToggle from '../components/DarkModeToggle';

export default () => (
  <Fragment>
    <SEO title="Software Engineer, Web Developer" />
    <LandingAnimation />
    <DarkModeToggle />
    <Div100vh />
    <Div100vh />
    <Div100vh />
  </Fragment>
);
