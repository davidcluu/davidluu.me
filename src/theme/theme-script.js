import { minify } from 'uglify-js';

import themeHtmlTemplate from '!!handlebars-loader!./theme-script-html.hbs';

import {
  themeLocalStorageKey,
  darkModeClassName,
  lightModeClassName,
} from './constants';

const compiledScriptHtml = themeHtmlTemplate({
  themeLocalStorageKey,
  darkModeClassName,
  lightModeClassName,
});

const script = compiledScriptHtml.replace(/(<([^>]+)>)/gi, '');

const minifiedScript = minify(script).code;

export default minifiedScript;
