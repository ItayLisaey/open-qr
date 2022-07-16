import { MotionProps } from 'framer-motion';

const standard: MotionProps = {
  initial: { scale: 0.7, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.7, opacity: 0 },
};

export const AnimationPresets = {
  standard,
};
