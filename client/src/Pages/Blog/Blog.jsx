import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaClock, FaBookOpen } from "react-icons/fa";
import Banner from "../../components/Banner";
import SpinnerLoader from "../../components/Loader";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchBlogs();
  }, []);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_URL}/blogs`);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      setBlogs(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const navigate = useNavigate();

  const handleReadMore = (blog) => {
    navigate(`/blog/${blog._id}`); // ✅ Correct path
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <SpinnerLoader size={35} />
      </div>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 mt-10">
      <Banner
        text="Blogs"
        imageUrl="https://img.freepik.com/free-photo/people-working-tech-brand-together_23-2150966134.jpg?semt=ais_country_boost&w=740"
      />

      <div className="grid md:grid-cols-3 gap-8 mt-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all transform flex flex-col"
            data-aos="fade-up"
          >
            {/* Blog Image */}
            <img
              src={blog.imgUrl}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />

            {/* Blog Details */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Category & Timestamp */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {blog.category}
                </span>
                <div className="flex items-center gap-1">
                  <FaClock className="text-red-500" />
                  <span className="text-gray-400">
                    {formatDate(blog.createdAt)}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {blog.title}
              </h2>

              {/* Author */}
              <div className="flex items-center space-x-2 text-gray-600 text-sm mb-3">
                <FaUser className="text-red-500" />
                <span className="font-medium">{blog.author}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-4 flex-grow">
                {truncateText(blog.content, 20)}
              </p>

              {/* Read More Button */}
              <button
                onClick={() => handleReadMore(blog)}
                className="w-full text-center px-6 py-3 bg-[#4ADE80] text-white font-semibold rounded-full flex items-center justify-center gap-2"
              >
                <FaBookOpen className="text-white" /> Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
