import type React from 'react';

type TiltHandlers<T extends HTMLElement> = {
  onMouseMove: React.MouseEventHandler<T>;
  onMouseEnter: React.MouseEventHandler<T>;
  onMouseLeave: React.MouseEventHandler<T>;
};

export function getPointerTiltHandlers<T extends HTMLElement = HTMLDivElement>(
  maxTilt = 9,
  scale = 1.02
): TiltHandlers<T> {
  return {
    onMouseEnter: (event) => {
      const element = event.currentTarget;
      element.style.setProperty('--tilt-scale', String(scale));
      element.style.setProperty('--tilt-rotate-x', '0deg');
      element.style.setProperty('--tilt-rotate-y', '0deg');
      element.style.setProperty('--spot-x', '50%');
      element.style.setProperty('--spot-y', '50%');
      element.style.setProperty('--spot-inv-x', '50%');
      element.style.setProperty('--spot-inv-y', '50%');
    },
    onMouseMove: (event) => {
      const element = event.currentTarget;
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateX = ((0.5 - y) * 2 * maxTilt).toFixed(2);
      const rotateY = ((x - 0.5) * 2 * maxTilt).toFixed(2);

      element.style.setProperty('--tilt-rotate-x', `${rotateX}deg`);
      element.style.setProperty('--tilt-rotate-y', `${rotateY}deg`);
      element.style.setProperty('--spot-x', `${(x * 100).toFixed(2)}%`);
      element.style.setProperty('--spot-y', `${(y * 100).toFixed(2)}%`);
      element.style.setProperty('--spot-inv-x', `${((1 - x) * 100).toFixed(2)}%`);
      element.style.setProperty('--spot-inv-y', `${((1 - y) * 100).toFixed(2)}%`);
    },
    onMouseLeave: (event) => {
      const element = event.currentTarget;
      element.style.setProperty('--tilt-rotate-x', '0deg');
      element.style.setProperty('--tilt-rotate-y', '0deg');
      element.style.setProperty('--tilt-scale', '1');
      element.style.setProperty('--spot-x', '50%');
      element.style.setProperty('--spot-y', '50%');
      element.style.setProperty('--spot-inv-x', '50%');
      element.style.setProperty('--spot-inv-y', '50%');
    }
  };
}
