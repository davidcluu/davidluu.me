import { ClassNames } from '@emotion/react';

import ResumeAnchor from './ResumeAnchor';
import CopyrightFooter from '../../components/CopyrightFooter';

export default () => (
  <ClassNames>
    {({ css }) => (
      <CopyrightFooter
        AnchorComponent={ResumeAnchor}
        className={css`
          background-color: var(--resume--background--background-color);
          color: var(--resume--body--font-color);

          @media print {
            display: none;
          }
        `}
      />
    )}
  </ClassNames>
);
