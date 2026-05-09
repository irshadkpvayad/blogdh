import { Link } from 'react-router-dom';
import { Moon, Sun, Menu, Search, X } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { useState } from 'react';

const Navbar = ({ darkMode, toggleTheme }) => {
  const { user, dbUser, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-display font-bold text-primary-600 dark:text-primary-400">
              QalamBlog
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 transition-colors">Home</Link>
            <Link to="/categories" className="text-slate-600 hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400 transition-colors">Categories</Link>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary-500 text-sm outline-none w-48 transition-all focus:w-64"
              />
              <Search className="absolute left-3 top-1.5 h-4 w-4 text-slate-400" />
            </div>

            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
            </button>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <img src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} alt="avatar" className="h-8 w-8 rounded-full ring-2 ring-primary-500 object-cover" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-xl shadow-lg py-2 hidden group-hover:block border border-slate-100 dark:border-dark-border">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-dark-border">
                    <p className="text-sm font-semibold truncate">{dbUser?.name || user.displayName}</p>
                    <p className="text-xs text-slate-500 truncate">{dbUser?.role}</p>
                  </div>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">Dashboard</Link>
                  {dbUser?.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 text-primary-600">Admin Panel</Link>
                  )}
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-slate-50 dark:hover:bg-slate-800">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary">
                Login / Signup
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
