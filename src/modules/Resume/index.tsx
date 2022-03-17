import { Fragment } from 'react';

import Wrapper from './ResumeWrapper';
import Resume from './Resume';
import CopyrightFooter from './ResumeCopyrightFooter';

export default () => (
  <Fragment>
    <Wrapper>
      <Resume />
    </Wrapper>
    <CopyrightFooter />
  </Fragment>
);
