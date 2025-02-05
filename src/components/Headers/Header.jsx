import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/slider/bhiwhite.svg";
import { FaSearch } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdVoiceChat } from "react-icons/md";
import { MdCastForEducation } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#212121] shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Navbar */}
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-extrabold text-black tracking-wide transition-all duration-300 font-serif hover:text-[#14ff72cb]"
              style={{
                textDecoration: "none",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              <img
                src={logo} // Path to your SVG file
                alt="Bright Horizon Institute Logo"
                className="h-14" // Set height of the logo as per your design
              />
            </Link>
          </div>

          {/* Search Bar - Hidden on Mobile */}
          <div className="hidden lg:flex flex-grow justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-2 text-white border border-green-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-white" // Add your custom class here
              />
              <button className="absolute inset-y-0 right-3 flex items-center">
                <FaSearch className="h-5 w-5 text-[#14ff72cb]" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-[#14ff72cb] rounded-md transition duration-200 focus:bg-black hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                />
              </svg>
            )}
          </button>

          {/* Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:gap-x-12">
            <Link
              to="/"
              className="text-lg font-medium text-white transition-all duration-300 transform hover:text-[#14ff72cb] hover:scale-110 hover:underline no-underline flex items-center space-x-2"
              style={{
                textDecoration: "none",
              }}
            >
              <FaHome className="h-5 w-5 text-[#14ff72cb]" />
              <span className="">Home</span>
            </Link>
            <Link
              to="/about"
              className="text-lg font-medium text-white transition-all duration-300 transform hover:text-[#14ff72cb] hover:scale-110 hover:underline no-underline flex items-center space-x-2"
              style={{
                textDecoration: "none",
              }}
            >
              <MdVoiceChat className="h-5 w-5 text-[#14ff72cb]" />

              <span className="">About</span>
            </Link>
            <Link
              to="/courses"
              className="text-lg font-medium text-white transition-all duration-300 transform hover:text-[#14ff72cb] hover:scale-110 hover:underline no-underline flex items-center space-x-2"
              style={{
                textDecoration: "none",
              }}
            >
              <MdCastForEducation className="h-5 w-5 text-[#14ff72cb]" />
              <span>Courses</span>
            </Link>
            <Link
              to="/contact"
              className="text-lg font-medium text-white transition-all duration-300 transform hover:text-[#14ff72cb] hover:scale-110 hover:underline no-underline flex items-center space-x-2"
              style={{
                textDecoration: "none",
              }}
            >
              <FaPhoneVolume className="h-5 w-5 text-[#14ff72cb]" />

              <span>Contact</span>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="absolute top-full left-0 w-full bg-[#212121] rounded-md shadow-md lg:hidden">
            <div className="flex flex-col px-6 py-4 space-y-2">
              <Link
                to="/"
                className="py-2 text-lg font-medium text-white transition-all duration-300 transform hover:text-[#14ff72cb] hover:scale-105 hover:underline flex items-center space-x-2"
                style={{
                  textDecoration: "none",
                }}
              >
                <FaHome className="h-5 w-5 text-[#14ff72cb] mr-4" />
                Home
              </Link>
              <Link
                to="/about"
                className="py-2 text-lg font-medium text-white transition-all duration-300 transform hover:text-[#14ff72cb] hover:scale-105 hover:underline flex items-center space-x-2"
                style={{
                  textDecoration: "none",
                }}
              >
                <MdVoiceChat className="h-5 w-5 text-[#14ff72cb] mr-4" />
                About
              </Link>
              <Link
                to="/courses"
                className="py-2 text-lg font-medium text-white transition-all duration-300 transform hover:text-[#14ff72cb] hover:scale-105 hover:underline flex items-center space-x-2"
                style={{
                  textDecoration: "none",
                }}
              >
                <MdVoiceChat className="h-5 w-5 text-[#14ff72cb] mr-4" />
                Courses
              </Link>

              <Link
                to="/contact"
                className="py-2 text-lg font-medium text-white transition-all duration-300 transform hover:text-[#14ff72cb] hover:scale-105 hover:underline flex items-center space-x-2"
                style={{
                  textDecoration: "none",
                }}
              >
                <FaPhoneVolume className="h-5 w-5 text-[#14ff72cb] mr-4" />
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
