"use client";

import React, { useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";

interface FilterSearchProps {
  // Add any props if needed
}

const FilterSearch: React.FC<FilterSearchProps> = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const handleClear = () => setSearchValue("");

  // Dropdown options for design categories
  const options = [
    "Web Design",
    "Graphic Design",
    "UI/UX",
    "Illustration",
    "Motion Design",
    "Branding",
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 w-full max-w-3xl mx-auto p-4">
      {/* Dropdown Button */}
      <div className="relative">
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow-md transition-colors"
        >
          All Categories
          <ChevronDown className="ml-2 h-5 w-5" />
        </button>

        {dropdownOpen && (
          <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
            <ul className="py-2">
              {options.map((option, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="flex items-center flex-1 border border-gray-300 rounded-md px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition">
        <Search className="text-gray-500 mr-2" />
        <input
          type="text"
          className="flex-grow focus:outline-none text-sm"
          placeholder="Search design categories..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {searchValue && (
          <button onClick={handleClear} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterSearch;
