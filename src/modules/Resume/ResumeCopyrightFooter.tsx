import { ClassNames } from '@emotion/react';

import ResumeAnchor from './ResumeAnchor';
import CopyrightFooter from '../../components/CopyrightFooter';

export default () => (
  <ClassNames>
    {({ css, theme }) => (
      <CopyrightFooter
        AnchorComponent={ResumeAnchor}
        className={css`
          ${theme.utils.getThemeVariantCSSWithFallback(
            'background-color',
            'resume.background.background-color'
          )}
          ${theme.utils.getThemeVariantCSSWithFallback(
            'color',
            'resume.body.font-color'
          )}

          @media print {
            display: none;
          }
        `}
      />
    )}
  </ClassNames>
);
