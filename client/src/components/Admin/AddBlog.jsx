import { useState } from "react";
import axios from "axios";

const AddBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    subTitle: "",
    image: "",
    description: "",
    content: "",
    author: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📝 Form Submitted:", blogData);

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8000/blogs", blogData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setIsSuccess(true);

      // Reset form after submission
      setBlogData({
        title: "",
        subTitle: "",
        image: "",
        description: "",
        content: "",
        author: "",
      });
    } catch (error) {
      console.error("❌ API Error Details:", error.response || error.message);
      setMessage(error.response?.data?.message || "Error adding blog");
      setIsSuccess(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Blog</h2>

      {message && (
        <div
          className={`alert ${isSuccess ? "alert-success" : "alert-danger"}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {Object.keys(blogData).map((key) => (
          <div className="mb-3" key={key}>
            <label className="form-label">
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type="text"
              className="form-control"
              name={key}
              value={blogData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
