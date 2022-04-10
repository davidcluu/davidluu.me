import Typography from 'typography';

const DEFAULT_FONT_STACK = ['Arial', 'Helvetica', 'sans-serif'];

const HEADER_FONT = 'Lato';
const HEADER_FONT_STACK = [HEADER_FONT, ...DEFAULT_FONT_STACK];
export const HEADER_FONT_CSS = HEADER_FONT_STACK.join(',');
export const HEADER_FONT_WEIGHT_NORMAL = '500';
export const HEADER_FONT_WEIGHT_BOLD = '600';

const BODY_FONT = 'Montserrat';
const BODY_FONT_STACK = [BODY_FONT, ...DEFAULT_FONT_STACK];
export const BODY_FONT_CSS = BODY_FONT_STACK.join(',');
export const BODY_FONT_WEIGHT_LIGHT = '100';
export const BODY_FONT_WEIGHT_NORMAL = '400';
export const BODY_FONT_WEIGHT_BOLD = '600';

export const BASE_FONT_SIZE = '16px';
const BASE_FONT_COLOR = '#000';
const BASE_LINE_HEIGHT = 1.5;
export const BASE_LINE_HEIGHT_CSS = `${BASE_LINE_HEIGHT}`;

const typography = new Typography({
  baseFontSize: BASE_FONT_SIZE,
  baseLineHeight: BASE_LINE_HEIGHT,
  googleFonts: [
    {
      name: BODY_FONT,
      styles: [
        BODY_FONT_WEIGHT_LIGHT,
        BODY_FONT_WEIGHT_NORMAL,
        BODY_FONT_WEIGHT_BOLD,
      ],
    },
    {
      name: HEADER_FONT,
      styles: [HEADER_FONT_WEIGHT_NORMAL, HEADER_FONT_WEIGHT_BOLD],
    },
  ],
  headerFontFamily: HEADER_FONT_STACK,
  headerColor: BASE_FONT_COLOR,
  headerWeight: HEADER_FONT_WEIGHT_BOLD,
  headerLineHeight: 1.1,
  bodyFontFamily: BODY_FONT_STACK,
  bodyColor: BASE_FONT_COLOR,
  bodyWeight: BODY_FONT_WEIGHT_NORMAL,
  includeNormalize: true,
});

export default typography;
