import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaClock, FaBookOpen } from "react-icons/fa";
import Banner from "../../components/Banner";
import GlobalApi from "../../services/GlobalApi";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await GlobalApi.getBlog();
      console.log("API Response:", res); // Debugging API response

      // Ensure res.data.data exists and is an array
      if (!res.data || !Array.isArray(res.data.data)) {
        throw new Error("Invalid API response structure");
      }

      // Extracting blog data safely
      const fetchedBlogs = res.data.data.map((blog) => ({
        id: blog.id,
        title: blog.attributes?.title || "Untitled",
        author: blog.attributes?.author || "Unknown",
        date: blog.attributes?.date
          ? new Date(blog.attributes.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "Unknown Date",
        readingTime: blog.attributes?.readingTime || "N/A",
        category: blog.attributes?.category?.split(",")[0] || "Uncategorized",
        description: blog.attributes?.description || "No description available.",
        image:
          blog.attributes?.image?.data?.attributes?.formats?.medium?.url ||
          blog.attributes?.image?.data?.attributes?.url ||
          "https://via.placeholder.com/750", // Fallback image
        content: blog.attributes?.content || "",
      }));

      setBlogs(fetchedBlogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleReadMore = (blog) => {
    navigate(`/blog/${blog.id}`, { state: blog });
  };

  if (loading) return <p className="text-center mt-5">Loading blogs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Banner
        text="Blogs"
        imageUrl="https://img.freepik.com/free-photo/college-girl-working-with-laptop-after-lessons_496169-88.jpg?ga=GA1.1.1581216429.1736934459&semt=ais_hybrid"
      />

      <div className="grid md:grid-cols-3 gap-8 mt-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all transform flex flex-col"
            data-aos="fade-up"
          >
            {/* Blog Image */}
            <img
              src={blog.image}
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
                  <span className="text-gray-400">{blog.date}</span>
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
              <p className="text-gray-600 mb-4 flex-grow">{blog.description}</p>

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
