"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthContext";
import {
  ChevronDown,
  User,
  LogOut,
  BarChart4,
  Cog,
} from "lucide-react";

interface UserMenuProps {
  userName: string;
  userEmail: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ userName, userEmail }) => {
  const { logout } = useAuth();
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  // Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Use the first letter of the user's name if no photo is available
  const avatarLetter = userName ? userName.charAt(0).toUpperCase() : "U";

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar + Chevron Trigger */}
      <button
        onClick={handleMenuToggle}
        className="flex items-center space-x-2 focus:outline-none group"
      >
        {/* Avatar Circle */}
        <div className="bg-gray-300 text-gray-800 font-bold rounded-full h-9 w-9 flex items-center justify-center group-hover:ring-2 group-hover:ring-white transition">
          {avatarLetter}
        </div>
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <div
          className="
            absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50
            origin-top-right transition-transform transform
            animate-dropdown
          "
        >
          {/* Top Section with user info */}
          <div className="flex items-center space-x-3 p-4 border-b border-gray-100 bg-gray-50 rounded-t-lg">
            <div className="bg-gray-300 text-gray-800 font-bold rounded-full h-10 w-10 flex items-center justify-center">
              {avatarLetter}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">
                {userName}
              </span>
              <span className="text-xs text-gray-500">{userEmail}</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => router.push("/profile")}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </button>
            <button
              onClick={() => router.push("/dashboard/poster")}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <BarChart4 className="h-4 w-4 mr-2" />
              Poster Dashboard
            </button>
            <button
              onClick={() => router.push("/dashboard/competitor")}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <BarChart4 className="h-4 w-4 mr-2" />
              Competitor Dashboard
            </button>
            <button
              onClick={() => router.push("/settings")}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Cog className="h-4 w-4 mr-2" />
              Settings
            </button>
          </div>

          {/* Logout */}
          <div className="py-2 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/*
        Optionally, define a Tailwind animation class in your globals.css or tailwind.css:
        @keyframes dropdown {
          0%   { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-dropdown {
          animation: dropdown 0.15s ease-out forwards;
        }
      */}
    </div>
  );
};

export default UserMenu;
