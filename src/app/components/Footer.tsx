import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Palmtree, Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleFooterOptionClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!isPrivacyOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isPrivacyOpen]);

  const openPrivacyModal = () => setIsPrivacyOpen(true);
  const closePrivacyModal = () => setIsPrivacyOpen(false);

  return (
    <footer className="glass border-t border-border mt-auto relative z-10 w-full backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-tr from-primary to-secondary p-2.5 rounded-xl shadow-lg shadow-primary/20">
                <Palmtree className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Travista India
              </span>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
              Your trusted companion for discovering Incredible India with curated itineraries. 
              Experience the diversity, culture, and heritage of Bharat!
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" title="Facebook" className="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_rgba(56,189,248,0.30)]">
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="Twitter" title="Twitter" className="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_rgba(56,189,248,0.30)]">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="Instagram" title="Instagram" className="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_rgba(56,189,248,0.30)]">
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="#" aria-label="Email" title="Email" className="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_rgba(56,189,248,0.30)]">
                <Mail className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" onClick={handleFooterOptionClick} className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={handleFooterOptionClick} className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/travel-diary" onClick={handleFooterOptionClick} className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  Travel Diary
                </Link>
              </li>
              <li>
                <Link to="/my-trips" onClick={handleFooterOptionClick} className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  My Trips
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" onClick={handleFooterOptionClick} className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <Link to="/faq" onClick={handleFooterOptionClick} className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openPrivacyModal}
                  className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <Link to="/terms-of-service" onClick={handleFooterOptionClick} className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>&copy; 2026 Travista India. All rights reserved. Made with ❤️ for Incredible India</p>
        </div>
      </div>

      <AnimatePresence>
        {isPrivacyOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePrivacyModal}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="privacy-policy-title"
              className="w-full max-w-2xl glass-card border border-white/20 rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.35)] p-6 md:p-8 relative"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closePrivacyModal}
                aria-label="Close privacy policy"
                title="Close"
                className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/20 glass text-foreground/80 hover:text-primary hover:border-primary/40 transition-colors"
              >
                <span className="text-2xl leading-none">×</span>
              </button>

              <h3 id="privacy-policy-title" className="text-2xl md:text-3xl font-bold text-foreground mb-5 pr-12">
                Privacy Policy
              </h3>

              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                We value your privacy. This website collects basic user information such as name, email, and travel-related data to provide features like trip management and travel diary. User-uploaded content such as photos and videos may be visible to other users. We do not sell or share personal data with third parties. By using this website, you agree to this policy. For more details, refer to the full Privacy Policy.{" "}
                <Link
                  to="/privacy-policy"
                  onClick={() => {
                    closePrivacyModal();
                    handleFooterOptionClick();
                  }}
                  className="font-semibold text-primary underline underline-offset-4 hover:text-secondary transition-colors"
                >
                  Learn more
                </Link>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}