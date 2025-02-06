import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/slider/bhilogo.svg";
import { FaSearch, FaHome, FaPhoneVolume } from "react-icons/fa";
import { MdVoiceChat, MdCastForEducation } from "react-icons/md";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-[#14ff72ee] shadow-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={logo}
                alt="Bright Horizon Institute Logo"
                className="h-13"
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-grow justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-2 text-black border border-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black"
              />
              <button className="absolute inset-y-0 right-3 flex items-center">
                <FaSearch className="h-5 w-5 text-[#0F76A8]" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button - Fixed on the Right Side */}
          <button
            type="button"
            style={{
              padding: "8px",
              color: "#212121",
              borderRadius: "5px",
              transition: "all 0.2s ease-in-out",
              backgroundColor: isMenuOpen ? "black" : "transparent",
              position: "absolute", // Fix it to the right side
              right: "16px", // Adjust this to set the right margin
              top: "50%", // Center the button vertically
              transform: "translateY(-50%)", // Adjust to truly center the button vertically
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden" // Hide on large screens and above
          >
            {isMenuOpen ? (
              <svg
                width="24"
                height="24"
                fill="none"
                stroke={isMenuOpen ? "#0F76A8" : "currentColor"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                fill="none"
                stroke={isMenuOpen ? "##0F76A8" : "currentColor"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:gap-x-12">
            {[
              {
                path: "/",
                label: "Home",
                icon: <FaHome className="h-5 w-5" />,
              },
              {
                path: "/about",
                label: "About",
                icon: <MdVoiceChat className="h-5 w-5" />,
              },
              {
                path: "/courses",
                label: "Courses",
                icon: <MdCastForEducation className="h-5 w-5" />,
              },
              {
                path: "/contact",
                label: "Contact",
                icon: <FaPhoneVolume className="h-5 w-5" />,
              },
            ].map(({ path, label, icon }, index) => (
              <Link
                key={index}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  color: location.pathname === path ? "#212121" : "#0F76A8",
                  fontWeight: location.pathname === path ? "bold" : "bold",
                  textDecoration:
                    location.pathname === path ? "none" : "none",
                  padding: "8px 0",
                  fontSize: "1.125rem",
                  fontFamily: "Nunito",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="absolute top-full left-0 w-full bg-[#14ff72] rounded-md shadow-md lg:hidden">
            <div className="flex flex-col px-6 py-4 space-y-2">
              {[
                {
                  path: "/",
                  label: "Home",
                  icon: <FaHome className="h-5 w-5" />,
                },
                {
                  path: "/about",
                  label: "About",
                  icon: <MdVoiceChat className="h-5 w-5" />,
                },
                {
                  path: "/courses",
                  label: "Courses",
                  icon: <MdCastForEducation className="h-5 w-5" />,
                },
                {
                  path: "/contact",
                  label: "Contact",
                  icon: <FaPhoneVolume className="h-5 w-5" />,
                },
              ].map(({ path, label, icon }, index) => (
                <Link
                  key={index}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    color: location.pathname === path ? "#212121" : "#0F76A8",
                    fontWeight: location.pathname === path ? "bold" : "bold",
                    textDecoration:
                      location.pathname === path ? "none" : "none",
                    padding: "8px 0",
                    fontSize: "1.125rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
