const RANDOMIZATION_FACTOR = 0.4;

export const getRandomizationRatio = () =>
  Math.random() * RANDOMIZATION_FACTOR + 2 * RANDOMIZATION_FACTOR;
