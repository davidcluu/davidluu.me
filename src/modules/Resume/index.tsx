import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { helmetJsonLdProp } from 'react-schemaorg';

import Navbar from './ResumeNavbar';
import Wrapper from './ResumeWrapper';
import Resume from './Resume';
import CopyrightFooter from './ResumeCopyrightFooter';

import resumeJsonLD from './resume-json-ld';

export default () => (
  <Fragment>
    <Helmet script={[helmetJsonLdProp(resumeJsonLD)]} />
    <Navbar />
    <Wrapper>
      <Resume />
    </Wrapper>
    <CopyrightFooter />
  </Fragment>
);
