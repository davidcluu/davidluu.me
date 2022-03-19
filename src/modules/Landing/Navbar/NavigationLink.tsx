import type { ReactNode } from 'React';
import type { GatsbyLinkProps } from 'gatsby';

import { Link } from 'gatsby';
import { css } from '@emotion/react';

import useLandingScrollPercent from '../hooks/use-landing-scroll-percent';

import {
  headerFontNormalCss,
  headerFontBoldCss,
} from '../../../config/typography';

interface NavigationLinkProps<T>
  // https://github.com/gatsbyjs/gatsby/issues/16682 for 'ref' omission
  extends Omit<GatsbyLinkProps<T>, 'ref' | 'to'> {
  children: string;
  href: string;
}

// TODO may need to update this component if I need to add links to external sites
export default ({ children, href, ...props }: NavigationLinkProps<any>) => {
  const landingAnimationInViewport = useLandingScrollPercent() < 1;
  return (
    <Link
      css={({ utils }) => css`
        margin: 0 1em;

        ${headerFontNormalCss}
        ${utils.getThemeVariantCSSWithFallback(
          'color',
          landingAnimationInViewport
            ? 'landing.navbar.animationInViewport.color'
            : 'landing.navbar.animationNotInViewport.color'
        )}
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
      `}
      {...props}
      to={href}
      title={children}
      children={children as ReactNode}
    />
  );
};
