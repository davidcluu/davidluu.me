import type { MotionValue } from 'framer-motion';

import { useTransform } from 'framer-motion';

export default (motionValue: MotionValue<number>) =>
  useTransform(motionValue, (percent) => `${percent}%`);
