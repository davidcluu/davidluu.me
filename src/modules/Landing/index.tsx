import { Fragment } from 'react';

import Div100vh from 'react-div-100vh';

import Navbar from './Navbar';
import CopyrightFooter from './CopyrightFooter';

export default () => (
  <Fragment>
    <Navbar />
    <Div100vh style={{ backgroundColor: 'green' }} />
    <Div100vh style={{ backgroundColor: 'green' }} />
    <CopyrightFooter />
  </Fragment>
);
