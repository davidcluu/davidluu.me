import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

import { getWindowHeight } from '../../../store/slices/Window/selectors';
import { getScrollY } from '../../../store/slices/Scroll/selectors';

export default () => {
  const {
    utils: { getThemeInvariantCSSValue, cssValueTransformers },
  } = useTheme();

  const windowHeight = useSelector(getWindowHeight);
  const scrollY = Math.ceil(useSelector(getScrollY));
  const navbarHeight = getThemeInvariantCSSValue(
    'navbar.desktop.height',
    cssValueTransformers.pixelToNumber
  );

  // If the viewport is scrolled past the animation (i.e. windowScrollRatio > 1), just return 1
  return scrollY >= windowHeight - navbarHeight
    ? 1
    : scrollY / (windowHeight - navbarHeight);
};
