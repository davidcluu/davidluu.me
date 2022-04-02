import themeHtmlTemplate from '!!handlebars-loader!./html.hbs';

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
