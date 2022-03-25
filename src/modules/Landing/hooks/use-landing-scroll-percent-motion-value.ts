import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

import { getWindowHeight } from '../../../store/slices/Window/selectors';
import { useViewportScroll, useTransform } from 'framer-motion';

export default () => {
  const {
    utils: { getThemeInvariantCSSValue, cssValueTransformers },
  } = useTheme();

  const windowHeight = useSelector(getWindowHeight);
  const navbarHeight = getThemeInvariantCSSValue(
    'navbar.desktop.height',
    cssValueTransformers.pixelToNumber
  );

  const { scrollY } = useViewportScroll();
  return useTransform(scrollY, (y) => {
    const yCeiling = Math.ceil(y);

    return yCeiling >= windowHeight - navbarHeight
      ? 1
      : yCeiling / (windowHeight - navbarHeight);
  });
};
