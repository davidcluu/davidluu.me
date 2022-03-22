import { Fragment } from 'react';

import Navbar from './ResumeNavbar';
import Wrapper from './ResumeWrapper';
import Resume from './Resume';
import CopyrightFooter from './ResumeCopyrightFooter';

export default () => (
  <Fragment>
    <Navbar />
    <Wrapper>
      <Resume />
    </Wrapper>
    <CopyrightFooter />
  </Fragment>
);
