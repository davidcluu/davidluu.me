import type { GatsbyLinkProps } from 'gatsby';
import type { Theme } from '@emotion/react';
import type IDs from './ids';

import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import { animate } from 'framer-motion';
import { css, ClassNames, useTheme } from '@emotion/react';

const linkCss = ({ utils }: Theme) => css`
  margin: 0 0.25em;

  ${utils.getHeaderFontCSSWithFallback('normal')}
  font-size: 1.25em;
  text-decoration: none;

  &:active,
  &:hover,
  &:visited {
    ${utils.getHeaderFontCSSWithFallback('bold')}
  }

  // https://css-tricks.com/bold-on-hover-without-the-layout-shift/
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &::after {
    height: 0;

    content: attr(title);
    content: attr(title) / '';
    visibility: hidden;
    overflow: hidden;
    user-select: none;
    pointer-events: none;

    ${utils.getHeaderFontCSSWithFallback('bold')}

    @media speech {
      display: none;
    }
  }
`;

export enum NavigationTarget {
  Page = 'page',
  Scroll = 'scroll',
}

type PageNavigationProps = {
  navigationTarget: NavigationTarget.Page;
};

type ScrollNavigationProps = {
  navigationTarget: NavigationTarget.Scroll;
  scrollTarget: IDs;
};

interface CustomGatsbyLinkProps
  // https://github.com/gatsbyjs/gatsby/issues/16682 for 'ref' omission
  extends Omit<GatsbyLinkProps<any>, 'ref' | 'to'> {
  children: string;
  href: string;
  scrollTarget?: string;
}

export type NavigationLinkProps = CustomGatsbyLinkProps &
  (PageNavigationProps | ScrollNavigationProps);

// TODO may need to update this component if I need to add links to external sites
export default ({
  children,
  href,
  className,
  activeClassName,
  navigationTarget,
  scrollTarget,
  ...props
}: NavigationLinkProps) => {
  const { pathname } = useLocation();
  const {
    utils: { getThemeInvariantCSSValue, cssValueTransformers },
  } = useTheme();

  if (navigationTarget === NavigationTarget.Page) {
    return (
      <ClassNames>
        {({ css: classCss, cx, theme }) => (
          <Link
            {...props}
            className={cx(classCss(linkCss(theme)), className)}
            activeClassName={cx(classCss``, activeClassName)}
            to={href}
            title={children}
            children={children}
          />
        )}
      </ClassNames>
    );
  } else if (navigationTarget === NavigationTarget.Scroll) {
    if (pathname === href) {
      const navbarHeight = getThemeInvariantCSSValue(
        'navbar.desktop.height',
        cssValueTransformers.pixelToNumber
      );

      return (
        <a
          css={linkCss}
          {...props}
          className={className}
          href={`${href}#${scrollTarget}`}
          onClick={(e) => {
            e.preventDefault();

            const scrollTargetElement = document.getElementById(scrollTarget);

            if (scrollTargetElement != null) {
              const currentPosition = window.pageYOffset || window.scrollY;
              const targetPosition =
                scrollTargetElement.offsetTop - navbarHeight;
              const distance = Math.abs(targetPosition - currentPosition);

              animate(currentPosition, targetPosition, {
                onUpdate: (top) => window.scrollTo({ top }),
                type: 'tween',
                duration: distance / 1500,
                ease: 'easeIn',
              });
            }
          }}
          title={children}
          children={children}
        ></a>
      );
    } else {
      // TODO Render Link with scroll context
      return (
        <ClassNames>
          {({ css: classCss, cx, theme }) => (
            <Link
              {...props}
              className={cx(classCss(linkCss(theme)), className)}
              to={href}
              title={children}
              children={children}
            />
          )}
        </ClassNames>
      );
    }
  }
  return null;
};
