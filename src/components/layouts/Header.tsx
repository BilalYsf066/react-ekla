import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-display font-bold text-primary-700">
            Ekla
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/products" className="font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Products
            </Link>
            <Link to="/artisans" className="font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Artisans
            </Link>
          </nav>

          {/* Search form - desktop */}
          <div className="hidden md:block w-1/3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 pr-10 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-primary-600"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-neutral-700 hover:text-primary-600 relative">
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center text-neutral-700 hover:text-primary-600">
                  <User size={24} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm text-neutral-700 border-b border-neutral-100">
                      Signed in as <span className="font-medium">{user?.name}</span>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                      Your Profile
                    </Link>
                    {user?.role === 'artisan' && (
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100">
                        Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex items-center px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors">
                Sign In
              </Link>
            )}

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-neutral-700 focus:outline-none" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-neutral-100">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-neutral-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-neutral-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/artisans" 
                className="text-neutral-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Artisans
              </Link>
              {!isAuthenticated && (
                <Link 
                  to="/login" 
                  className="text-neutral-700 hover:text-primary-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>

            {/* Search form - mobile */}
            <form onSubmit={handleSearch} className="mt-4 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 pr-10 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-primary-600"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;