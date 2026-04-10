import React from 'react';
import { motion } from 'motion/react';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
  title?: string;
}

/**
 * Animated Card with pop-in effect on entry and hover effects
 * Automatically applies staggered animations in lists
 */
export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className = '', delay = 0, onClick, title }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ 
          y: -8, 
          boxShadow: '0 20px 40px rgba(56, 189, 248, 0.2)' 
        }}
        whileTap={{ scale: 0.98 }}
        transition={{
          duration: 0.4,
          delay,
          ease: 'easeOut'
        }}
        viewport={{ once: true, margin: '-50px' }}
        onClick={onClick}
        className={className}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : -1}
        title={title}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';

interface AnimatedCardGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container for animated cards with stagger effect
 */
export const AnimatedCardGrid = React.forwardRef<HTMLDivElement, AnimatedCardGridProps>(
  ({ children, className = '' }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: '-100px' }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedCardGrid.displayName = 'AnimatedCardGrid';

// Stagger container for list items
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = React.forwardRef<HTMLDivElement, StaggerContainerProps>(
  ({ children, className = '', staggerDelay = 0.1 }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          staggerChildren: staggerDelay,
          delayChildren: 0.2,
        }}
        viewport={{ once: true, margin: '-100px' }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }
);

StaggerContainer.displayName = 'StaggerContainer';
