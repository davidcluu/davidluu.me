import { ClassNames } from '@emotion/react';

import ClientOnly from '../ClientOnly';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Theme, actions } from '../../store/slices/Theme';
import { getDarkMode } from '../../store/slices/Theme/selectors';

// Workaround for compiled code for 'react-dark-mode-toggle-2' bringing in code
// that assumes browser objects being available that requires the component
// only when the component is rendered, and preventing this component from
// being SSR'd
const ClientOnlyDarkModeToggle = ({ toggleWidth, toggleClassName }) => {
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

const DarkModeToggle = () => (
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
          <ClientOnlyDarkModeToggle
            toggleWidth={toggleWidth}
            toggleClassName={toggleClassName}
          />
        </ClientOnly>
      );
    }}
  </ClassNames>
);

export default DarkModeToggle;
