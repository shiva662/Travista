import { Palmtree, Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
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
              <a href="#" className="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_rgba(56,189,248,0.30)]">
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_rgba(56,189,248,0.30)]">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_rgba(56,189,248,0.30)]">
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_20px_rgba(56,189,248,0.30)]">
                <Mail className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  Home
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  About Us
                </a>
              </li>
              <li>
                <Link to="/travel-diary" className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  Travel Diary
                </Link>
              </li>
              <li>
                <Link to="/my-trips" className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
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
                <a href="#" className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all duration-300">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>&copy; 2026 Travista India. All rights reserved. Made with ❤️ for Incredible India</p>
        </div>
      </div>
    </footer>
  );
}