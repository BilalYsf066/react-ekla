import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="text-xl font-display font-bold text-white">
              Ekla
            </Link>
            <p className="mt-4 text-sm">
              Connecting you with authentic West African artisanal products 
              and the talented makers behind them.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=home" className="text-sm hover:text-white transition-colors">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link to="/products?category=fashion" className="text-sm hover:text-white transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/products?category=jewelry" className="text-sm hover:text-white transition-colors">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/products?category=art" className="text-sm hover:text-white transition-colors">
                  Art
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/artisans" className="text-sm hover:text-white transition-colors">
                  Our Artisans
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Ekla Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;