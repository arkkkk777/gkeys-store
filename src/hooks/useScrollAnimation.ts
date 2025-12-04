import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface UseScrollAnimationOptions {
  once?: boolean;
  threshold?: number;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { once = true, threshold = 0.1 } = options;
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return { ref, isInView };
}

export const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeInVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

