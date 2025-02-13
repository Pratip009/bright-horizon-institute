import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/slider/bhilogo.svg";
import { FaSearch, FaHome, FaPhoneVolume } from "react-icons/fa";
import { MdVoiceChat, MdCastForEducation } from "react-icons/md";
import { FaBlog } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [coursesData, setCoursesData] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Close menu when navigating
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Fetch courses data
  useEffect(() => {
    fetch("/courses.json")
      .then((response) => response.json())
      .then((data) => {
        setCoursesData(data);
        console.log("Courses Loaded:", data); // Debugging
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  // Auto filter courses that start with searchQuery
  useEffect(() => {
    if (!Array.isArray(coursesData) || searchQuery.trim() === "") {
      setFilteredCourses([]);
      return;
    }

    console.log("Filtering for:", searchQuery);

    const filtered = coursesData.filter((course) =>
      course.title?.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    console.log("Filtered Courses:", filtered);
    setFilteredCourses(filtered);
  }, [searchQuery, coursesData]);

  // Hide dropdown when clicking outside

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredCourses([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCourseClick = (courseId) => {
    setSearchQuery("");
    setFilteredCourses([]);
    navigate(`/courses/${courseId}`); // Navigating using course ID instead of slug
  };

  return (
    <header className="sticky top-0 left-0 w-full z-50 bg-white shadow-md border-b border-gray-200">
      <div className="px-6 mx-auto max-w-7xl sm:px-8 lg:px-1 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Bright Horizon Institute Logo"
            className="h-14"
          />
        </Link>

        {/* Search Bar */}
        <div
          className="hidden lg:flex flex-grow justify-center relative"
          ref={searchRef}
        >
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Courses"
              className="w-full px-5 py-2 text-gray-800 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-lg"
              style={{
                boxShadow:
                  "0 6px 10px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)",
              }}
            />
            <button className="absolute inset-y-0 right-3 flex items-center">
              <FaSearch className="h-5 w-5 text-gray-600 hover:text-blue-500 transition" />
            </button>
          </div>

          {/* Search Results Dropdown */}
          {filteredCourses.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg border border-gray-300 rounded-md mt-2 z-50 max-h-60 overflow-y-auto">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => handleCourseClick(course.id)}
                >
                  {/* Course Image - Circular */}
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-12 h-12 rounded-full object-cover border border-gray-300"
                  />

                  {/* Course Details */}
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                      {course.title}
                    </span>
                    <span className="text-sm text-gray-600">
                      {course.time} | {course.programTime}
                    </span>
                    <span className="text-xs text-gray-500">
                      {course.certification} - {course.credential}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div
          className="hidden lg:flex gap-x-1"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {[
            { path: "/", label: "Home", icon: <FaHome /> },
            { path: "/about", label: "About", icon: <MdVoiceChat /> },
            {
              path: "/courses",
              label: "Courses",
              icon: <MdCastForEducation />,
            },
            { path: "/blog", label: "Blog", icon: <FaBlog /> },
            { path: "/gallery", label: "Gallery", icon: <RiGalleryFill /> },
            { path: "/contact", label: "Contact", icon: <FaPhoneVolume /> },
          ].map(({ path, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-2 text-lg font-semibold transition-all px-3 py-2 rounded-lg"
                style={{
                  color: isActive ? "#FB2C36" : "#4a4a4a",
                  fontWeight: isActive ? "bold" : "normal",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-gray-800 focus:outline-none"
        >
          {isMenuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="absolute top-20 left-0 w-full bg-white shadow-md border-t border-gray-200 lg:hidden">
          <div className="flex flex-col px-6 py-4 space-y-3">
            {[
              { path: "/", label: "Home", icon: <FaHome /> },
              { path: "/about", label: "About", icon: <MdVoiceChat /> },
              {
                path: "/courses",
                label: "Courses",
                icon: <MdCastForEducation />,
              },
              { path: "/blog", label: "Blog", icon: <FaBlog /> },
              { path: "/gallery", label: "Gallery", icon: <RiGalleryFill /> },
              { path: "/contact", label: "Contact", icon: <FaPhoneVolume /> },
            ].map(({ path, label,  }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 text-lg text-gray-800 hover:text-blue-500 transition-all px-4 py-3 rounded-lg"
                style={{
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
