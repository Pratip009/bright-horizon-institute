const Blog = require("../models/Blog");

// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Admin
const createBlog = async (req, res) => {
  try {
    console.log("📥 Incoming Request Body:", req.body);
    console.log("👤 User ID:", req.user?.id);

    const { title, subTitle, image, description, content, author } = req.body;

    if (!title || !subTitle || !image || !description || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({
      title,
      subTitle,
      image,
      description,
      content,
      author: author || "Anonymous", // Default author if not provided
      createdBy: req.user?.id || "System", // Handle missing user ID
      createdAt: new Date(),
    });

    await newBlog.save();
    console.log("✅ Blog Created Successfully:", newBlog);

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get blog by ID
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Admin
const updateBlog = async (req, res) => {
  try {
    const { title, subTitle, image, description, content, author } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, subTitle, image, description, content, author },
      { new: true }
    );

    if (!updatedBlog)
      return res.status(404).json({ message: "Blog not found" });

    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Admin
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
