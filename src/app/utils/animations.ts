// Framer Motion animation variants for consistent effects across the app

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" }
};

export const popIn = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: { 
    duration: 0.4, 
    ease: "easeOut",
    type: "spring",
    stiffness: 100,
    damping: 15
  }
};

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const hoverScale = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.3 }
};

export const hoverPop = {
  whileHover: { scale: 1.08 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const rotateIn = {
  initial: { opacity: 0, rotate: -10 },
  animate: { opacity: 1, rotate: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export const pulse = {
  animate: { 
    scale: [1, 1.05, 1],
    transition: { 
      duration: 2, 
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const float = {
  animate: { 
    y: [0, -10, 0],
    transition: { 
      duration: 3, 
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const shimmer = {
  animate: { 
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: { 
      duration: 3, 
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const bounce = {
  animate: { 
    y: [0, -10, 0],
    transition: { 
      duration: 1.5, 
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Tap animation for interactive elements
export const tapAnimation = {
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 }
};

// Glow effect
export const glowEffect = {
  whileHover: { 
    filter: "drop-shadow(0 0 20px rgba(56, 189, 248, 0.5))",
  },
  transition: { duration: 0.3 }
};
