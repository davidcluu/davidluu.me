import { ThemeProvider } from '@emotion/react';

import {
  ThemeContextReadOnlyInterface,
  useThemeContext,
} from '../context/Theme';

interface EmotionThemeProviderProps {
  children: JSX.Element;
}

declare module '@emotion/react' {
  export interface Theme extends ThemeContextReadOnlyInterface {}
}

export default ({ children }: EmotionThemeProviderProps): JSX.Element => (
  <ThemeProvider theme={useThemeContext()}>{children}</ThemeProvider>
);
