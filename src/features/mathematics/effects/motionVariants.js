export const shakeVariants = {
  idle: { x: 0 },
  shake: {
    x: [-10, 10, -8, 8, -4, 4, 0],
    transition: { duration: 0.5 },
  },
};

export const levelVariants = {
  initial: { opacity: 0, y: 20, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35 },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.96,
    transition: { duration: 0.2 },
  },
};

export const buttonMotion = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};
