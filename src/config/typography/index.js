import Typography from 'typography';
import { css } from '@emotion/core';

const DEFAULT_FONT_STACK = ['Arial', 'Helvetica', 'sans-serif'];

const HEADER_FONT = 'Lato';
const HEADER_FONT_WEIGHT_NORMAL = 500;
const HEADER_FONT_WEIGHT_BOLD = 600;

const BODY_FONT = 'Montserrat';
const BODY_FONT_WEIGHT_LIGHT = 100;
const BODY_FONT_WEIGHT_NORMAL = 400;
const BODY_FONT_WEIGHT_BOLD = 600;

const BASE_FONT_SIZE = '16px';
const BASE_FONT_COLOR = '#000';
const BASE_LINE_HEIGHT = '1.2rem';

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
  bodyFontFamily: [BODY_FONT, ...DEFAULT_FONT_STACK],
  bodyColor: BASE_FONT_COLOR,
  bodyWeight: BODY_FONT_WEIGHT_NORMAL,
  headerFontFamily: [HEADER_FONT, ...DEFAULT_FONT_STACK],
  headerColor: BASE_FONT_COLOR,
  headerWeight: HEADER_FONT_WEIGHT_BOLD,
  headerLineHeight: 1.1,
  includeNormalize: true,
});

export default typography;

const CSS_FONT_FAMILY_PROPERTY = 'font-family';
const CSS_FONT_WEIGHT_PROPERTY = 'font-weight';

const bodyFontStack = typography.options.bodyFontFamily.join(',');
const headerFontStack = typography.options.headerFontFamily.join(',');

export const baseFontSize = css`
  font-size: ${BASE_FONT_SIZE};
`;

export const baseFontColor = css`
  color: ${BASE_FONT_COLOR};
`;

export const baseLineHeight = css`
  line-height: ${BASE_LINE_HEIGHT};
`;

export const headerFontNormalCss = css`
  ${CSS_FONT_FAMILY_PROPERTY}: ${headerFontStack};
  ${CSS_FONT_WEIGHT_PROPERTY}: ${HEADER_FONT_WEIGHT_NORMAL};
`;

export const headerFontBoldCss = css`
  ${CSS_FONT_FAMILY_PROPERTY}: ${headerFontStack};
  ${CSS_FONT_WEIGHT_PROPERTY}: ${HEADER_FONT_WEIGHT_BOLD};
`;

export const bodyFontLightCss = css`
  ${CSS_FONT_FAMILY_PROPERTY}: ${bodyFontStack};
  ${CSS_FONT_WEIGHT_PROPERTY}: ${BODY_FONT_WEIGHT_LIGHT};
`;

export const bodyFontNormalCss = css`
  ${CSS_FONT_FAMILY_PROPERTY}: ${bodyFontStack};
  ${CSS_FONT_WEIGHT_PROPERTY}: ${BODY_FONT_WEIGHT_NORMAL};
`;

export const bodyFontBoldCss = css`
  ${CSS_FONT_FAMILY_PROPERTY}: ${bodyFontStack};
  ${CSS_FONT_WEIGHT_PROPERTY}: ${BODY_FONT_WEIGHT_BOLD};
`;
