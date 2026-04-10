import { Outlet, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-foreground selection:bg-primary/30">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content" className="flex-1 w-full relative z-10 pt-20 md:pt-24" role="main" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
