import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-[#E6E6E1] z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#171717] tracking-tight">GoRide</span>
          <div className="w-2 h-2 rounded-full bg-[#315C4B]"></div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/search" className={({isActive}) => `text-sm font-medium ${isActive ? 'text-[#171717]' : 'text-[#6B6B67] hover:text-[#171717]'} transition-colors`}>
            Bus Tickets
          </NavLink>
          <NavLink to={user ? '/my-bookings' : '/login'} className={({isActive}) => `text-sm font-medium ${isActive ? 'text-[#171717]' : 'text-[#6B6B67] hover:text-[#171717]'} transition-colors`}>
            Track Bus
          </NavLink>
          <NavLink to="/help" className={({isActive}) => `text-sm font-medium ${isActive ? 'text-[#171717]' : 'text-[#6B6B67] hover:text-[#171717]'} transition-colors`}>
            Help
          </NavLink>
        </nav>

        {/* Auth / User actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button 
                onClick={toggleDropdown}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#E6E6E1] hover:border-[#171717] transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#F7F7F5] flex items-center justify-center text-xs font-bold text-[#315C4B]">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-[#171717]">{user.name}</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E6E6E1] rounded-xl py-2 shadow-sm">
                  <Link to="/my-bookings" className="block px-4 py-2 text-sm text-[#171717] hover:bg-[#F7F7F5]" onClick={() => setIsDropdownOpen(false)}>My Bookings</Link>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-[#171717] hover:bg-[#F7F7F5]" onClick={() => setIsDropdownOpen(false)}>Profile</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-[#171717] hover:bg-[#F7F7F5]" onClick={() => setIsDropdownOpen(false)}>Admin Dashboard</Link>
                  )}
                  <button onClick={() => { logout(); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-[#F7F7F5]">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-[#171717] hover:text-[#315C4B] transition-colors">
                Login
              </Link>
              <Link to="/register" className="px-5 py-2.5 bg-[#315C4B] text-white text-sm font-medium rounded-lg hover:bg-[#234F3E] transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-[#171717]" onClick={toggleMenu}>
          <span className="material-symbols-outlined text-2xl">{isMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-[#E6E6E1] p-4 flex flex-col gap-4">
          <Link to="/search" className="text-[#171717] font-medium" onClick={toggleMenu}>Bus Tickets</Link>
          <Link to={user ? '/my-bookings' : '/login'} className="text-[#171717] font-medium" onClick={toggleMenu}>Track Bus</Link>
          <Link to="/help" className="text-[#171717] font-medium" onClick={toggleMenu}>Help</Link>
          
          <div className="h-px bg-[#E6E6E1] my-2"></div>
          
          {user ? (
            <>
              <Link to="/my-bookings" className="text-[#171717] font-medium" onClick={toggleMenu}>My Bookings</Link>
              <Link to="/profile" className="text-[#171717] font-medium" onClick={toggleMenu}>Profile</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-[#171717] font-medium" onClick={toggleMenu}>Admin Dashboard</Link>
              )}
              <button onClick={() => { logout(); toggleMenu(); }} className="text-left text-red-600 font-medium">Logout</button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/login" className="px-4 py-3 border border-[#E6E6E1] rounded-lg text-center font-medium" onClick={toggleMenu}>Login</Link>
              <Link to="/register" className="px-4 py-3 bg-[#315C4B] text-white rounded-lg text-center font-medium" onClick={toggleMenu}>Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
