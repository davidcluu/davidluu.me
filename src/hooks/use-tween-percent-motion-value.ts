import type { MotionValue } from 'framer-motion';

import { useTransform } from 'framer-motion';

export default <O>(motionValue: MotionValue<number>, outputRange: O[]) =>
  useTransform(motionValue, [0, 1], outputRange);
