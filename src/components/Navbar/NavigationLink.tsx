import type { GatsbyLinkProps } from 'gatsby';
import type IDs from './ids';

import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import { animate } from 'framer-motion';
import { css, useTheme } from '@emotion/react';

import {
  headerFontNormalCss,
  headerFontBoldCss,
} from '../../config/typography';

const linkCss = css`
  margin: 0 0.25em;

  ${headerFontNormalCss}
  font-size: 1.25em;
  text-decoration: none;

  &:active,
  &:hover,
  &:visited {
    ${headerFontBoldCss}
  }

  // https://css-tricks.com/bold-on-hover-without-the-layout-shift/
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &::after {
    height: 0;

    content: attr(title);
    content: attr(title) / '';
    visibility: hidden;
    overflow: hidden;
    user-select: none;
    pointer-events: none;

    ${headerFontBoldCss}

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
      <Link
        css={linkCss}
        {...props}
        to={href}
        title={children}
        children={children}
      />
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
        <Link
          css={linkCss}
          {...props}
          to={href}
          title={children}
          children={children}
        />
      );
    }
  }
  return null;
};
