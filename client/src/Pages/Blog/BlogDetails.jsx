import { useLocation } from "react-router-dom";

const BlogDetails = () => {
  const location = useLocation();
  const blog = location.state; // Get blog data from state

  if (!blog) {
    return <div className="text-center text-2xl font-semibold text-red-500 mt-10 font-[Nunito]">Blog not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 font-[Nunito]">
      {/* Blog Title */}
      <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center leading-tight px-6 font-[Quicksand]">
        {blog.title}
      </h1>

      {/* Blog Meta Info */}
      <div className="flex flex-wrap justify-center items-center text-gray-600 text-sm space-x-3 mb-8">
        <span className="font-semibold text-gray-900">{blog.author}</span>
        <span>•</span>
        <span>{blog.date}</span>
        <span>•</span>
        <span className="italic">{blog.readingTime}</span>
        <span>•</span>
        <span className="px-3 py-1 bg-[#4ADE80] text-white rounded-full text-xs font-semibold">{blog.category}</span>
      </div>

      {/* Blog Image - Full Width */}
      <div className="w-full max-w-5xl mx-auto">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-[500px] object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Blog Description */}
      <p className="text-xl text-gray-700 italic text-center my-8 px-6 mt-4">
        {blog.description}
      </p>

      {/* Blog Content - Larger & Well-Spaced */}
      <div className="w-full max-w-5xl mx-auto text-lg leading-relaxed text-gray-800 px-6">
        {blog.content.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-6">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;
