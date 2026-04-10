import { useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router';
import { LayoutDashboard, Users, MapPin, Star, LogOut } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const adminName = user?.name || 'Admin User';

  useEffect(() => {
    if (!isLoggedIn || (user as any)?.role !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Places', path: '/admin/places', icon: <MapPin size={20} /> },
    { name: 'Reviews', path: '/admin/reviews', icon: <Star size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-neutral-950 text-white overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col transition-all duration-300">
        <div className="p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
            Travista Admin
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`
              }
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 flex items-center justify-end px-8 bg-neutral-900/50 backdrop-blur-md border-b border-neutral-800/50">
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">{adminName}</p>
              <p className="text-xs text-emerald-400">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <span className="text-emerald-400 font-bold text-lg">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-neutral-950 to-neutral-950 -z-10"></div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
