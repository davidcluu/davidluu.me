import type { NavigationLinkProps } from './NavigationLink';

import { ClassNames } from '@emotion/react';
import styled from '@emotion/styled';

import DefaultNavigationLink, { NavigationTarget } from './NavigationLink';
import DefaultNavigationSublinks from './NavigationSublinks';

import IDs from './ids';
import { headerFontNormalCss } from '../../config/typography';

interface NavbarProps {
  wrapperClassName?: string;
  NavigationLink?: React.ComponentType<NavigationLinkProps>;
  NavigationSublinks?: React.ComponentType<any>;
}

export default ({
  wrapperClassName,
  NavigationLink = (props) => <DefaultNavigationLink {...props} />,
  NavigationSublinks = (props) => <DefaultNavigationSublinks {...props} />,
}: NavbarProps) => {
  const NavigationSublink = styled(NavigationLink)`
    font-size: 1em;
  `;

  return (
    <ClassNames>
      {({ css, cx, theme: { utils } }) => (
        <nav
          className={cx(
            css`
              width: 100%;
              ${utils.getThemeInvariantCSSWithFallback(
                'height',
                'navbar.desktop.height'
              )}

              position: fixed;
              top: 0;
              z-index: 9999;
              display: flex;
              justify-content: space-between;
              align-items: center;

              ${headerFontNormalCss}
            `,
            wrapperClassName
          )}
        >
          <div>{/* TODO Put logo here */}</div>
          <div
            className={css`
              display: flex;
              align-items: center;
            `}
          >
            <NavigationLink href="/" navigationTarget={NavigationTarget.Page}>
              Home
            </NavigationLink>
            <NavigationSublinks>
              <NavigationSublink
                href="/"
                navigationTarget={NavigationTarget.Scroll}
                scrollTarget={IDs.About}
              >
                About
              </NavigationSublink>
              <NavigationSublink
                href="/"
                navigationTarget={NavigationTarget.Scroll}
                scrollTarget={IDs.Contact}
              >
                Contact
              </NavigationSublink>
            </NavigationSublinks>
            <NavigationLink
              href="/resume"
              navigationTarget={NavigationTarget.Page}
            >
              Resume
            </NavigationLink>
          </div>
        </nav>
      )}
    </ClassNames>
  );
};
