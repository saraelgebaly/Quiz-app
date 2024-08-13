//@ts-ignore
import { AnimationSequence, animate } from "framer-motion"
type AnimationSequence = Parameters<typeof animate>[0];
export const paginationVariants = {
  hidden: {
    opacity: 0,
    y: 200,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 2
    }
  }
}

export const opacityAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}
export const RotateAnimation = {
  initial: { rotateY: 90 },
  animate: { rotateY: 0 },
  exit: { rotateY: -90 }
}
export const ScaleAnimation = {
  initial: { scale: 0.7 },
  animate: { scale: 1 },
  exit: { scale: 0.7 }
}
export const WidthAnimation = {
  initial: { width: 0 },
  animate: { width: "100%" },
  exit: { width: "100%", x: window.innerWidth }
}

export const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const sparkles = Array.from({ length: 15 });
export const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
  `.sparkle-${index}`,
  {
    x: randomNumberBetween(-80, 80),
    y: randomNumberBetween(-40, 40),
    scale: randomNumberBetween(1.5, 2.5),
    opacity: 1,

  },
  {
    duration: 0.4,
    at: "<"
  }
])

export const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
  `.sparkle-${index}`,
  {
    opacity: 0,
    scale: 0
  },
  {
    duration: 0.3,
    at: "<"
  }
])

export const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
  `.sparkle-${index}`,
  {
    x: 0,
    y: 0,
  },
  {
    duration: 0.000001,
  },
]);

export const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}; 


export const letterAnimation = {
  rest: {
    y: 0,
  },
  hover: {
    y: -25,
    transition: {
      duration: 0.3,
      ease: [0.6, 0.01, 0.05, 0.95],
      type: "tween",

    }
  }
}
export const letterAnimationTwo = {
  rest: {
    y: 25,
  },
  hover: {
    y: 0
  }
}

export const titleAnimation = {
  rest: {
    transition: {
      staggerChildren: 0.003,
    }
  },
  hover: {
    transition: {
      staggerChildren: 0.003,
    }
  },
}
