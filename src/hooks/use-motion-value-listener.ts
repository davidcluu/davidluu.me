import type { MotionValue } from 'framer-motion';

import { useEffect, useState } from 'react';

export default <T>(motionValue: MotionValue<T>): T => {
  const [value, setValue] = useState(motionValue.get());

  useEffect(() => motionValue.onChange(setValue), []);

  return value;
};
