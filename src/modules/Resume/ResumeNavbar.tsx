import { ClassNames, css } from '@emotion/react';

import Navbar from '../../components/Navbar';
import DefaultNavigationLink from '../../components/Navbar/NavigationLink';

const NavigationLink = (props) => (
  <DefaultNavigationLink
    css={({ utils }) => css`
      ${utils.getThemeVariantCSSWithFallback(
        'color',
        'resume.anchor.font-color'
      )}
    `}
    {...props}
  />
);

export default () => (
  <ClassNames>
    {({ css: classCss, theme: { utils } }) => (
      <Navbar
        NavigationLink={NavigationLink}
        wrapperClassName={classCss`
          position: static;

          ${utils.getThemeVariantCSSWithFallback(
            'background-color',
            'resume.background.background-color'
          )}
          ${utils.getThemeVariantCSSWithFallback(
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
