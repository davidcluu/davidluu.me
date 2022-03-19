import { useSelector } from 'react-redux';

import { navbarHeightPixels } from '../config';

import { getWindowHeight } from '../../../store/slices/Window/selectors';
import { getScrollY } from '../../../store/slices/Scroll/selectors';

export default () => {
  const windowHeight = useSelector(getWindowHeight);
  const scrollY = useSelector(getScrollY);

  const windowScrollRatio = scrollY / (windowHeight - navbarHeightPixels);
  // If the viewport is scrolled past the animation (i.e. windowScrollRatio > 1), just return 1
  return windowScrollRatio > 1 ? 1 : windowScrollRatio;
};
