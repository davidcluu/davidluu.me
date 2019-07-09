import { nest } from 'recompose';

import DarkModeThemeProvider from './DarkModeThemeProvider';
import MainThemeProvider from './MainThemeProvider';

export default nest(DarkModeThemeProvider, MainThemeProvider);
