import type { NavigationLinkProps } from './NavigationLink';

import { ClassNames } from '@emotion/react';
import styled from '@emotion/styled';

import DefaultNavigationLink, { NavigationTarget } from './NavigationLink';
import DefaultNavigationSublinks from './NavigationSublinks';

import IDs from './ids';

interface NavbarProps {
  wrapperClassName?: string;
  NavigationLink?: React.ComponentType<NavigationLinkProps>;
  linkClassName?: string;
  linkActiveClassName?: string;
  NavigationSublinks?: React.ComponentType<any>;
  sublinkClassName?: string;
  sublinkActiveClassName?: string;
}

export default ({
  wrapperClassName,
  NavigationLink = (props) => <DefaultNavigationLink {...props} />,
  linkClassName,
  linkActiveClassName,
  NavigationSublinks = (props) => <DefaultNavigationSublinks {...props} />,
  sublinkClassName,
  sublinkActiveClassName,
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

              ${utils.getHeaderFontCSSWithFallback('normal')}
            `,
            wrapperClassName
          )}
        >
          <div>{/* TODO Put logo here */}</div>
          <div
            className={css`
              display: flex;
              align-items: flex-end;
            `}
          >
            <NavigationLink
              href="/"
              className={linkClassName}
              activeClassName={linkActiveClassName}
              navigationTarget={NavigationTarget.Page}
            >
              Home
            </NavigationLink>
            <NavigationSublinks>
              <NavigationSublink
                href="/"
                className={cx(linkClassName, sublinkClassName)}
                activeClassName={sublinkActiveClassName}
                navigationTarget={NavigationTarget.Scroll}
                scrollTarget={IDs.About}
              >
                About
              </NavigationSublink>
              <NavigationSublink
                href="/"
                className={cx(linkClassName, sublinkClassName)}
                activeClassName={sublinkActiveClassName}
                navigationTarget={NavigationTarget.Scroll}
                scrollTarget={IDs.Contact}
              >
                Contact
              </NavigationSublink>
            </NavigationSublinks>
            <NavigationLink
              href="/resume"
              className={linkClassName}
              activeClassName={linkActiveClassName}
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
