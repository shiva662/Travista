import { useEffect, useRef } from 'react';

/**
 * Hook for triggering animations when elements come into view
 * Useful for scroll-triggered animations
 */
export const useInViewAnimation = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};

/**
 * Hook for parallax scroll effect
 * Moves element based on scroll position
 */
export const useParallax = (speed = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const scrollY = window.scrollY;
      ref.current.style.transform = `translateY(${scrollY * speed}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
};

/**
 * Hook for fade-in animation on mount
 * Automatically fades in element when it mounts
 */
export const useFadeInOnMount = (duration = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.animate(
      [
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ],
      {
        duration: duration * 1000,
        fill: 'both',
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    );
  }, [duration]);

  return ref;
};

/**
 * Hook for countdown number animation
 * Animates a number from 0 to target value
 */
export const useCountUp = (target: number, duration = 2000) => {
  const ref = useRef<HTMLDivElement>(null);
  const nodeRef = useRef(0);

  useEffect(() => {
    if (!ref.current) return;

    const startTime = Date.now();
    
    const updateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      nodeRef.current = Math.floor(target * progress);
      if (ref.current) {
        ref.current.textContent = nodeRef.current.toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    updateCount();
  }, [target, duration]);

  return ref;
};

/**
 * Hook for bounce animation effect
 * Creates a bouncy element that animates on interaction
 */
export const useBounce = () => {
  const ref = useRef<HTMLDivElement>(null);

  const trigger = () => {
    if (!ref.current) return;

    ref.current.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(0.9)' },
        { transform: 'scale(1.1)' },
        { transform: 'scale(1)' }
      ],
      {
        duration: 500,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }
    );
  };

  return { ref, trigger };
};
