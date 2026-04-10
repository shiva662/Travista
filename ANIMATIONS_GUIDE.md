# Animation System Guide

Your tour project now has a comprehensive animation system with multiple ways to add dynamic effects! Here's how to use everything:

## 🎬 Animation Utilities (Framer Motion)

Located in `src/app/utils/animations.ts`, these are pre-built animation variants for Framer Motion:

### Basic Animations
- `fadeInUp` - Fades in while moving up
- `fadeInDown` - Fades in while moving down  
- `fadeInLeft` - Fades in while moving from left
- `fadeInRight` - Fades in while moving from right
- `scaleIn` - Fades in with scale effect
- `popIn` - Bouncy pop-in with spring physics

### Container Animations
- `staggerContainer` - Container for staggered children
- `staggerItem` - Individual item for staggered effects

### Interactive Animations
- `hoverScale` - Scales up on hover
- `hoverPop` - Pops up on hover with tap feedback
- `tapAnimation` - Scales down on tap
- `glowEffect` - Adds glow shadow on hover

### Advanced Animations
- `slideInLeft` / `slideInRight` - Slide from edges
- `rotateIn` - Rotates in with fade
- `pulse` - Continuous pulse effect
- `float` - Floating up and down
- `bounce` - Bouncing animation

## 📝 Example Usage

### Using with Framer Motion
```tsx
import { motion } from 'motion';
import { fadeInUp, popIn, staggerContainer } from '../utils/animations';

export function MyComponent() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.h1 variants={fadeInUp}>
        Hello World
      </motion.h1>
      <motion.button variants={popIn}>
        Click Me
      </motion.button>
    </motion.div>
  );
}
```

## 🎨 CSS Animation Classes

Located in `src/styles/animations.css`, use these as utility classes:

### Pop & Scale Effects
- `.animate-pop-in` - Pops in with rotation
- `.animate-scale-in` - Scales in smoothly

### Slide Effects  
- `.animate-slide-in-left` - Slides from left
- `.animate-slide-in-right` - Slides from right
- `.animate-slide-in-top` - Slides from top
- `.animate-slide-in-bottom` - Slides from bottom

### Fade Effects
- `.animate-fade-in-up` - Fades in while moving up
- `.animate-fade-in-down` - Fades in while moving down

### Special Effects
- `.animate-shimmer` - Shimmer/shine effect
- `.animate-glow` - Glowing effect
- `.animate-float` - Floating animation
- `.animate-beat` - Heartbeat effect
- `.animate-wobble` - Wobble/shake effect
- `.animate-flip` - 3D flip animation
- `.animate-bounce-3d` - 3D bouncing

### Timing Utilities
Combine with any animation class:

**Delays (add to class):**
- `.delay-100` through `.delay-1000` (100ms increments)

**Durations:**  
- `.duration-300` - 300ms
- `.duration-500` - 500ms
- `.duration-700` - 700ms
- `.duration-1000` - 1000ms
- `.duration-2000` - 2000ms

**Example:**
```html
<div class="animate-pop-in delay-200 duration-700">
  Animated content
</div>
```

## 🪝 React Hooks

Located in `src/app/hooks/useAnimation.ts`:

### useInViewAnimation
Triggers animation when element enters viewport:
```tsx
const ref = useInViewAnimation();
return <div ref={ref} className="animate-fade-in-up" />;
```

### useParallax
Creates parallax scroll effect:
```tsx
const ref = useParallax(0.5);
return <div ref={ref} className="text-4xl">Parallax Text</div>;
```

### useFadeInOnMount
Auto fades in on component mount:
```tsx
const ref = useFadeInOnMount(0.5);
return <div ref={ref}>Content fades in</div>;
```

### useCountUp
Animates numbers from 0 to target:
```tsx
const ref = useCountUp(1000, 2000);
return <div ref={ref} className="text-3xl font-bold" />;
```

### useBounce
Bounce animation on command:
```tsx
const { ref, trigger } = useBounce();
return (
  <>
    <div ref={ref}>Bouncy element</div>
    <button onClick={trigger}>Bounce it!</button>
  </>
);
```

## 💫 Reusable Components

Located in `src/app/components/AnimatedCard.tsx`:

### AnimatedCard
Pre-animated card component with pop-in and hover effects:
```tsx
import { AnimatedCard } from '../components/AnimatedCard';

<AnimatedCard delay={0.1} onClick={() => console.log('clicked')}>
  Card content here
</AnimatedCard>
```

### StaggerContainer
Automatically stagger child animations:
```tsx
import { StaggerContainer } from '../components/AnimatedCard';

<StaggerContainer className="grid grid-cols-3 gap-4">
  {items.map((item) => (
    <AnimatedCard key={item.id}>{item.name}</AnimatedCard>
  ))}
</StaggerContainer>
```

## 🎯 Where Animations Are Already Used

1. **Home.tsx** - Hero section with staggered text, trip cards with pop-in effects
2. **Places.tsx** - Place cards with hover and pop animations, form animations
3. **Trip Cards** - Hover zoom, image scale, arrow slide effects
4. **Buttons** - Scale on hover and tap

## 🚀 Quick Start: Add Animation to Your Component

### Method 1: Framer Motion (Recommended for complex interactions)
```tsx
import { motion } from 'motion';
import { popIn } from '../utils/animations';

<motion.div variants={popIn} initial="initial" animate="animate">
  Your content
</motion.div>
```

### Method 2: CSS Classes (Simple, lightweight)
```tsx
<div className="animate-pop-in delay-300 duration-700">
  Your content
</div>
```

### Method 3: React Hooks (For scroll-triggered)
```tsx
import { useInViewAnimation } from '../hooks/useAnimation';

const ref = useInViewAnimation();
<div ref={ref} className="animate-fade-in-up">Your content</div>
```

## 🎨 Customization Tips

### Adjust animation speed:
```tsx
<motion.div
  variants={fadeInUp}
  transition={{ duration: 1.0 }} // Slower
>
  Content
</motion.div>
```

### Combine animations:
```tsx
<motion.div
  initial={{ opacity: 0, x: -50, rotate: -10 }}
  animate={{ opacity: 1, x: 0, rotate: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  Custom animation
</motion.div>
```

### Add delay for stagger effect manually:
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.1 }}
  >
    {item.name}
  </motion.div>
))}
```

## 📚 Framer Motion Docs

For more advanced animations, check the [Framer Motion documentation](https://motion.dev).

---

**Enjoy adding delightful animations to your tour site! 🎉**
