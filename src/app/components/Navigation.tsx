import { Link, useLocation } from 'react-router';
import { Palmtree, Menu, X, User, LogOut, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export function Navigation() {
  const location = useLocation();
  const { isLoggedIn, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    let dark = false;
    if (savedTheme === 'dark') {
      dark = true;
    } else if (savedTheme === 'light') {
      dark = false;
    } else {
      dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    root.classList.toggle('dark', dark);
    setIsDarkMode(dark);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !isDarkMode;
    root.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDarkMode(next);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Places', path: '/places' },
    { name: 'AI Planner', path: '/ai-planner' },
    { name: 'Travel Diary', path: '/travel-diary' },
    { name: 'My Trips', path: '/my-trips' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-400 ${scrolled ? 'glass shadow-[0_8px_24px_rgba(15,23,42,0.10)] py-2 border-b border-border/60' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-tr from-primary to-secondary p-2 rounded-xl warm-shadow group-hover:scale-105 transition-transform duration-300">
              <Palmtree className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:text-glow transition-all duration-300">
              Travista India
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-[15px] font-medium transition-colors duration-300 flex flex-col group ${
                  isActive(link.path) 
                    ? 'text-primary' 
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                <span>{link.name}</span>
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-10 h-10 rounded-full bg-secondary/10 hover:bg-secondary/20 border border-border flex items-center justify-center cursor-pointer transition-all hover:scale-105"
              title={isDarkMode ? 'Light mode' : 'Night mode'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-foreground" />
              )}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-4 ml-4">
                <span className="text-sm font-medium text-foreground bg-secondary/10 px-4 py-1.5 rounded-full border border-secondary/20">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  aria-label="Logout"
                  className="w-10 h-10 rounded-full bg-destructive/10 hover:bg-destructive/20 border border-destructive/30 flex items-center justify-center cursor-pointer hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all hover:scale-105"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 text-destructive" />
                </button>
              </div>
            ) : (
              <Link to="/login" aria-label="Login" className="ml-4 w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center cursor-pointer shadow-[0_8px_18px_rgba(56,189,248,0.35)] hover:shadow-[0_12px_24px_rgba(56,189,248,0.40)] transition-all hover:-translate-y-0.5">
                <User className="w-5 h-5 text-primary-foreground" />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden p-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-foreground transition-colors border border-border"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-card mt-4 p-4 rounded-xl border border-white/10 animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg transition-colors ${
                    isActive(link.path) 
                      ? 'bg-primary/20 text-primary font-medium' 
                      : 'text-foreground/80 hover:bg-secondary/10 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="h-px bg-border my-2" />

              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-foreground hover:bg-secondary/10 transition-colors w-full"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
                <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Night Mode'}</span>
              </button>

              <div className="h-px bg-border my-2" />
              
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-destructive hover:bg-destructive/10 transition-colors w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium shadow-lg mt-2"
                >
                  <User className="w-5 h-5" />
                  <span>Login to your account</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}