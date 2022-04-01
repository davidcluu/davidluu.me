import type { ComponentType, HTMLProps } from 'react';

import { css, useTheme } from '@emotion/react';

import AutomaticNewTabAnchor from '../../../components/AutomaticNewTabAnchor';

import LinkedinIcon from './svg/linkedin-icon';
import GithubIcon from './svg/github-icon';
import { useAppSelector } from '../../../store/hooks';
import { getDarkMode } from '../../../store/slices/Theme/selectors';

interface SvgLinkProps extends HTMLProps<HTMLAnchorElement> {
  SvgComponent: ComponentType<any>;
}

const SvgLink = ({ SvgComponent, href, ...props }: SvgLinkProps) => {
  const darkMode = useAppSelector(getDarkMode);
  const bodyFont =
    useTheme().utils.getThemeVariantCSSValue('landing.font-color');

  return (
    <li
      css={css`
        margin: 0 0.5em;
        padding: 0;

        line-height: 0;
      `}
    >
      <AutomaticNewTabAnchor
        href={href}
        css={css`
          display: inline-block;

          opacity: 0.9;

          &:hover {
            opacity: 1;
          }
        `}
        {...props}
      >
        <SvgComponent height="2em" color={darkMode && bodyFont} />
      </AutomaticNewTabAnchor>
    </li>
  );
};

const socialLinkProps = [
  {
    key: 'linkedin',
    SvgComponent: LinkedinIcon,
    href: 'https://www.linkedin.com/in/luudavidc/',
  },
  {
    key: 'github',
    SvgComponent: GithubIcon,
    href: 'https://github.com/davidcluu',
  },
];

const SocialLinks = () => (
  <ul
    css={css`
      margin: 0;
      border: none;
      padding: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      list-style-type: none;
    `}
  >
    {socialLinkProps.map((props) => (
      <SvgLink {...props} />
    ))}
  </ul>
);

export default SocialLinks;
