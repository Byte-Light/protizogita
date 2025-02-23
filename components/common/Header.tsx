"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext"; // Adjust the path if needed

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

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
            {isLoggedIn && (
              <Link href="/post-contest">
                <span className="text-lg font-medium text-white hover:text-gray-200 transition-colors duration-200 cursor-pointer">
                  Post Contest
                </span>
              </Link>
            )}
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

          {/* Desktop Login/Logout Button */}
          <div className="hidden md:flex items-center">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="text-white hover:text-gray-200 transition-colors duration-200">
                Logout
              </button>
            ) : (
              <Link href="/auth/login">
                <button className="text-white hover:text-gray-200 transition-colors duration-200">
                  Login
                </button>
              </Link>
            )}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-indigo-700 text-white p-4">
          <nav className="space-y-2">
            {isLoggedIn && (
              <Link href="/post-contest">
                <span className="block px-4 py-2 hover:bg-indigo-600 rounded">Post Contest</span>
              </Link>
            )}
            <Link href="/competitions">
              <span className="block px-4 py-2 hover:bg-indigo-600 rounded">Competitions</span>
            </Link>
            <Link href="/dashboard/poster">
              <span className="block px-4 py-2 hover:bg-indigo-600 rounded">Poster Dashboard</span>
            </Link>
            <Link href="/dashboard/competitor">
              <span className="block px-4 py-2 hover:bg-indigo-600 rounded">Competitor Dashboard</span>
            </Link>
            <Link href="/profile">
              <span className="block px-4 py-2 hover:bg-indigo-600 rounded">Profile</span>
            </Link>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-indigo-600 rounded">
                Logout
              </button>
            ) : (
              <Link href="/auth/login">
                <span className="block px-4 py-2 hover:bg-indigo-600 rounded">Login</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
