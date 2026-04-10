import { describe, expect, it } from 'vitest';
import { getPointerTiltHandlers } from './pointerTilt';

describe('getPointerTiltHandlers', () => {
  it('updates tilt and spotlight variables on mouse move', () => {
    const handlers = getPointerTiltHandlers<HTMLDivElement>(10, 1.02);
    const element = document.createElement('div');

    Object.defineProperty(element, 'getBoundingClientRect', {
      value: () => ({ left: 0, top: 0, width: 200, height: 100 })
    });

    handlers.onMouseEnter({ currentTarget: element } as any);
    handlers.onMouseMove({ currentTarget: element, clientX: 150, clientY: 25 } as any);

    expect(element.style.getPropertyValue('--tilt-scale')).toBe('1.02');
    expect(element.style.getPropertyValue('--tilt-rotate-x')).toContain('5.00deg');
    expect(element.style.getPropertyValue('--tilt-rotate-y')).toContain('5.00deg');
    expect(element.style.getPropertyValue('--spot-x')).toBe('75.00%');
    expect(element.style.getPropertyValue('--spot-y')).toBe('25.00%');
    expect(element.style.getPropertyValue('--spot-inv-x')).toBe('25.00%');
    expect(element.style.getPropertyValue('--spot-inv-y')).toBe('75.00%');
  });

  it('resets variables on mouse leave', () => {
    const handlers = getPointerTiltHandlers<HTMLDivElement>();
    const element = document.createElement('div');

    handlers.onMouseLeave({ currentTarget: element } as any);

    expect(element.style.getPropertyValue('--tilt-scale')).toBe('1');
    expect(element.style.getPropertyValue('--tilt-rotate-x')).toBe('0deg');
    expect(element.style.getPropertyValue('--tilt-rotate-y')).toBe('0deg');
  });
});
