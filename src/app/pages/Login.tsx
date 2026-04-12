import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Palmtree, Mail, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setError('');
    setInfo('');

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setError('Enter your email first, then click Forgot password.');
      return;
    }

    const newPassword = window.prompt('Enter a new password (min 6 characters):');
    if (newPassword === null) {
      return;
    }

    try {
      const response = await authAPI.resetPassword(normalizedEmail, newPassword);
      if (response.message && !response.error) {
        setInfo(response.message);
      } else {
        setError(response.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('Connection error. Is the backend running?');
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    try {
      let response;
      const normalizedEmail = email.trim().toLowerCase();
      
      if (isLogin) {
        response = await authAPI.login(normalizedEmail, password);
      } else {
        response = await authAPI.register(
          normalizedEmail.split('@')[0], // use email prefix as name for signup
          normalizedEmail,
          password
        );
        if (response.message && !response.user) {
          setError('Registered! Please log in.');
          setInfo('');
          setIsLogin(true);
          setLoading(false);
          return;
        }
      }

      if (response.token && response.user) {
        login(response.user, response.token);
        navigate('/');
      } else {
        setError(response.message || 'Authentication failed');
      }
    } catch (err: any) {
      setError('Connection error. Is the backend running?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden w-full">
      {/* Dynamic Background Image */}
      <div
        className="absolute inset-0 login-hero-bg bg-cover bg-center animate-in zoom-in duration-1000"
      ></div>
      
      {/* Rich Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-primary/40 backdrop-blur-md"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-in slide-in-from-bottom-8 duration-700 fade-in pt-4 md:pt-8">
        <div className="glass-card rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] p-10 border border-white/20 relative overflow-hidden">
          {/* Decorative ambient light */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/30 rounded-full blur-[40px]"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-secondary/30 rounded-full blur-[40px]"></div>

          {/* Logo element */}
          <div className="flex flex-col items-center mb-10 relative z-10">
            <div className="bg-gradient-to-tr from-primary to-secondary p-4 rounded-2xl mb-5 shadow-[0_12px_24px_rgba(56,189,248,0.35)] transform hover:scale-105 transition-transform duration-300">
              <Palmtree className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Travista India
            </h1>
            <p className="text-muted-foreground mt-2 font-medium">
              {isLogin ? 'Welcome back to your journey' : 'Begin your Indian adventure'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 glass border-l-4 border-destructive text-destructive rounded-xl animate-in fade-in slide-in-from-top-4 relative z-10">
              <span className="font-medium">{error}</span>
            </div>
          )}

            {info && (
              <div className="mb-6 p-4 glass border-l-4 border-emerald-500 text-emerald-400 rounded-xl animate-in fade-in slide-in-from-top-4 relative z-10">
                <span className="font-medium">{info}</span>
              </div>
            )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground ml-1 font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="traveler@journey.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/30 rounded-xl transition-all w-full text-foreground"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground ml-1 font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-14 bg-background/50 border-white/10 focus:border-primary/50 focus:ring-primary/30 rounded-xl transition-all w-full text-foreground"
                  required
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-background/50 text-primary focus:ring-primary/50 transition-all" />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-primary hover:text-secondary transition-colors font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button 
              type="submit"
              disabled={loading}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:shadow-[0_14px_30px_rgba(56,189,248,0.35)] text-primary-foreground rounded-xl transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-wait mt-8"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                isLogin ? 'Log In' : 'Sign Up'
              )}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-8 text-center text-sm relative z-10">
            <span className="text-muted-foreground">
              {isLogin ? "New to Travista India? " : 'Already expanding your horizons? '}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:text-secondary font-bold transition-colors ml-1"
            >
              {isLogin ? 'Create an account' : 'Log in here'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}