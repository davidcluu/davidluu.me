import type { NavigationLinkProps } from './NavigationLink';

import { ClassNames } from '@emotion/react';
import styled from '@emotion/styled';

import DefaultNavigationLink, { NavigationTarget } from './NavigationLink';
import DefaultNavigationSublinks from './NavigationSublinks';

import IDs from './ids';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Theme, actions } from '../../store/slices/Theme';
import { getDarkMode } from '../../store/slices/Theme/selectors';
import ClientOnly from '../ClientOnly';

interface NavbarProps {
  wrapperClassName?: string;
  NavigationLink?: React.ComponentType<NavigationLinkProps>;
  linkClassName?: string;
  linkActiveClassName?: string;
  NavigationSublinks?: React.ComponentType<any>;
  sublinkClassName?: string;
  sublinkActiveClassName?: string;
}

const DarkModeToggle = ({ toggleWidth, toggleClassName }) => {
  const DarkModeToggleComponent =
    require('react-dark-mode-toggle-2').DarkModeToggle;

  const isDarkMode = useAppSelector(getDarkMode);
  const dispatch = useAppDispatch();

  return (
    <DarkModeToggleComponent
      isDarkMode={isDarkMode}
      onChange={() =>
        dispatch(actions.setTheme(isDarkMode ? Theme.Light : Theme.Dark))
      }
      size={`${toggleWidth}px`}
      className={toggleClassName}
    />
  );
};

const ThemeToggle = () => (
  <ClassNames>
    {({ css, cx, theme: { utils } }) => {
      const navbarHeight = utils.getThemeInvariantCSSValue(
        'navbar.desktop.height',
        utils.cssValueTransformers.pixelToNumber
      );

      const toggleHeight = navbarHeight * 0.6;
      const toggleWidth = toggleHeight * 2;

      const toggleClassName = css`
        margin: 0 0.5em;

        display: inline;
      `;

      const placeholderClassName = cx(
        toggleClassName,
        css`
          width: ${toggleWidth}px;
          height: ${toggleHeight}px;
        `
      );

      return (
        <ClientOnly
          PlaceholderComponent={() => <div className={placeholderClassName} />}
        >
          <DarkModeToggle
            toggleWidth={toggleWidth}
            toggleClassName={toggleClassName}
          />
        </ClientOnly>
      );
    }}
  </ClassNames>
);

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
              align-items: center;
            `}
          >
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
            <ThemeToggle />
          </div>
        </nav>
      )}
    </ClassNames>
  );
};
