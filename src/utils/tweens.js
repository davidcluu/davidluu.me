/**
 * Returns a function that, given a percent (number between 0 and 1, inclusive), returns the number
 * that is "percent" percent between n1 and n2. While not disallowed, the result of invoking the
 * returned function with a percent value that is not between 0 and 1 is not well defined.
 *
 * @param {number} n1 The value at percent = 0
 * @param {number} n2 The value at percent = 1
 */
export const createLinearTweenFunction = (n1, n2) => percent =>
  (n2 - n1) * percent + n1;

/**
 * An object that represents a RGB color.
 *
 * @typedef {Object} RGB
 * @property {string} r The red portion of the color
 * @property {string} g The green portion of the color
 * @property {string} b The blue portion of the color
 */

/**
 * Returns a function that, given a percent (number between 0 and 1, inclusive), returns the RGB
 * object that is "percent" percent between rbg1 and rgb2.
 *
 * @see {@link createLinearTweenFunction}
 *
 * @param {RGB} rgb1 The rgb value at percent = 0
 * @param {RGB} rgb2 The rgb value at percent = 1
 */
export const createRgbTweenFunction = (
  { r: r1, g: g1, b: b1 },
  { r: r2, g: g2, b: b2 }
) => {
  const redTween = createLinearTweenFunction(r1, r2);
  const greenTween = createLinearTweenFunction(g1, g2);
  const blueTween = createLinearTweenFunction(b1, b2);

  return percent => ({
    r: redTween(percent),
    g: greenTween(percent),
    b: blueTween(percent),
  });
};

/**
 * Returns a function that, given a percent (number between 0 and 1, inclusive), returns the CSS
 * RGB string ("rgb(r, g, b)") that is "percent" percent between rbg1 and rgb2.
 *
 * @param {RGB} rgb1 The rgb value at percent = 0
 * @param {RGB} rgb2 The rgb value at percent = 1
 */
export const createRgbTweenToRgbStringFunction = (rgb1, rgb2) => {
  const rgbTween = createRgbTweenFunction(rgb1, rgb2);

  return percent => {
    const { r, g, b } = rgbTween(percent);

    return `rgb(${r}, ${g}, ${b})`;
  };
};
