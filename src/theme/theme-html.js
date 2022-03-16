import themeHtmlTemplate from '!!handlebars-loader!./theme-html.hbs';

import {
  themeLocalStorageKey,
  darkModeClassName,
  lightModeClassName,
} from './constants';

export default themeHtmlTemplate({
  themeLocalStorageKey,
  darkModeClassName,
  lightModeClassName,
});
