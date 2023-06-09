import { useAnimation, useMotionValue, useTransform } from "framer-motion";

export const slideInVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.1,
    },
  }),
};

export const slideFromTopVariantWithOpacity = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

export const slideFromLeftVariantWithOpacity = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};
export const slideFromRightVariantWithOpacity = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};
export const welcomeVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: 0.05 * i },
  }),
};
export const heroHausvariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: 1 },
  }),
};

export const staggerContainer = (staggerChildren: any, delayChildren: any) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren,
      },
    },
  };
};

export const arrowAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: { yoyo: Infinity, duration: 1 },
  },
};
