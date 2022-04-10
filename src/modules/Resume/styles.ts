import { css } from '@emotion/react';

import { BASE_FONT_SIZE } from '../../config/typography';

const PIXELS_PER_INCH = 96;
const POINTS_PER_INCH = 72;

const LETTER_WIDTH_INCHES = 8.5;
const LETTER_HEIGHT_INCHES = 11;

export const TARGET_PADDING_INCHES = 0.5;

const BASE_FONT_SIZE_PX = parseInt(BASE_FONT_SIZE);
const BASE_FONT_SIZE_PT =
  (BASE_FONT_SIZE_PX / PIXELS_PER_INCH) * POINTS_PER_INCH;

// https://www.techinterviewhandbook.org/resume/#only-use-standard-fonts-of-readable-sizes
const TARGET_FONT_SIZE_PT = 10;

// Makes resume more readable on the browser by scaling font size up
const SCALING_FACTOR = BASE_FONT_SIZE_PT / TARGET_FONT_SIZE_PT;

const RESUME_PAGE_WIDTH_PX = LETTER_WIDTH_INCHES * PIXELS_PER_INCH;

export const RESUME_PADDING_PX =
  SCALING_FACTOR * TARGET_PADDING_INCHES * PIXELS_PER_INCH;
export const RESUME_WIDTH_PX =
  SCALING_FACTOR * (RESUME_PAGE_WIDTH_PX - RESUME_PADDING_PX);

export const resumePageCss = css`
  padding: ${RESUME_PADDING_PX}px;
  width: ${RESUME_WIDTH_PX}px;
`;
