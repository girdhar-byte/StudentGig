import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '../ui/Button';
import { GraduationCap, Bell, User as UserIcon, Menu } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = location.pathname === '/';

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 transition-all hover:opacity-80 active:scale-95">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Student<span className="text-primary">Gig</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link to="/tasks" className={location.pathname === '/tasks' ? 'text-[#1F4E79] font-medium' : 'text-gray-600 hover:text-[#1F4E79]'}>Browse Tasks</Link>
          <Link to="/about" className="text-gray-600 hover:text-[#1F4E79]">About</Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative text-gray-600">
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              </Button>
              <Link to={`/dashboard/${user.role}`}>
                <Button variant="secondary" size="sm" className="gap-2">
                  <UserIcon className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>Sign Out</Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-gray-100 bg-white md:hidden"
          >
            <div className="flex flex-col gap-4 p-4">
              <Link to="/tasks" onClick={() => setIsMobileMenuOpen(false)}>Browse Tasks</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              {user ? (
                <>
                  <Link to={`/dashboard/${user.role}`} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                  <Button onClick={logout}>Sign Out</Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
