import { useState } from 'react';
import Dropdown from './Dropdown';

const Header = () => {
  const [isDropdownCollapsed, setIsDropdownCollapsed] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownCollapsed(!isDropdownCollapsed);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 w-7/12 mt-4 px-4 py-3 bg-white/30 backdrop-blur-md rounded-lg shadow-md flex items-center justify-between z-50">
      <div className="flex items-center">
        <img src="tensorcraft2.png" alt="TensorCraft Logo" className="h-10 mb-0" />
      </div>
      <nav className="hidden lg:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
        <a href="#" className="text-gray-700 hover:text-black">Home</a>
        <a href="#" className="text-gray-700 hover:text-black">Craft</a>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-700 hover:text-black flex items-center"
          >
            Solutions
            <Dropdown isCollapsed={isDropdownCollapsed} />
          </button>
          {!isDropdownCollapsed && (
            <div className="absolute left-0 mt-6 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Model Builder</a>
              <div className="flex items-center justify-center">
                <hr className="border-gray-200 w-4/5" />
              </div>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Figure Generator</a>
            </div>
          )}
        </div>
        <a href="#" className="text-gray-700 hover:text-black">Blog</a>
      </nav>
      <div className="hidden lg:flex items-center space-x-4">
        <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">Sign In</button>
      </div>
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} className="text-gray-700 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 lg:hidden">
          <nav className="flex flex-col space-y-2 p-4">
            <a href="#" className="text-gray-700 hover:text-black">Home</a>
            <a href="#" className="text-gray-700 hover:text-black">Craft</a>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-gray-700 hover:text-black flex items-center"
              >
                Solutions
                <Dropdown isCollapsed={isDropdownCollapsed} />
              </button>
              {!isDropdownCollapsed && (
                <div className="mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Model Builder</a>
                  <div className="flex items-center justify-center">
                    <hr className="border-gray-200 w-4/5" />
                  </div>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Figure Generator</a>
                </div>
              )}
            </div>
            <a href="#" className="text-gray-700 hover:text-black">Blog</a>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">Sign In</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
