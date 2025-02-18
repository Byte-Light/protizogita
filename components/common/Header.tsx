// src/components/Header.tsx
"use client"
import Link from 'next/link';
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer">
                Protizogita
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
          <Link href="/post-contest">
              <span className="text-lg font-medium text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer">
                Post Contest
              </span>
            </Link>
            <Link href="/competitions">
              <span className="text-lg font-medium text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer">
                Competitions
              </span>
            </Link>
            <Link href="/dashboard/poster">
              <span className="text-lg font-medium text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer">
                Poster Dashboard
              </span>
            </Link>
            <Link href="/dashboard/competitor">
              <span className="text-lg font-medium text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer">
                Competitor Dashboard
              </span>
            </Link>
            <Link href="/profile">
              <span className="text-lg font-medium text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer">
                Profile
              </span>
            </Link>
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center">
            <Link href="/auth/login">
              <span className="px-4 py-2 border border-white rounded-full text-white hover:bg-white hover:text-indigo-600 transition-colors duration-200 cursor-pointer">
                Login
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="text-white hover:text-gray-200 focus:outline-none transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-indigo-600">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/competitions">
              <span className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 transition-colors duration-200 cursor-pointer">
                Competitions
              </span>
            </Link>
            <Link href="/dashboard">
              <span className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 transition-colors duration-200 cursor-pointer">
                Dashboard
              </span>
            </Link>
            <Link href="/profile">
              <span className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 transition-colors duration-200 cursor-pointer">
                Profile
              </span>
            </Link>
            <Link href="/auth/login">
              <span className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-indigo-500 transition-colors duration-200 cursor-pointer">
                Login
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
