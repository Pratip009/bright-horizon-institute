import { useState, useEffect } from "react";
import axios from "axios";

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: "",
    imgUrl: "",
    price: "",
    duration: "",
    totalHours: "",
    credential: "",
    preRequisite: "",
    description: "",
    content: "",
    certification: "",
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);
const API_URL = import.meta.env.REACT_APP_API_URL || "http://localhost:8000"
  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/courses`);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/courses`, course, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Course added successfully");
      fetchCourses(); // Refresh the courses list after adding
      setCourse({
        title: "",
        imgUrl: "",
        price: "",
        duration: "",
        totalHours: "",
        credential: "",
        preRequisite: "",
        description: "",
        content: "",
        certification: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add course");
    }
  };

  // Function to handle course deletion
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Course deleted successfully");
      fetchCourses(); // Refresh the courses list after deleting
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete course");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Course</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded-md"
            type="text"
            name="title"
            placeholder="Title"
            value={course.title}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            name="imgUrl"
            placeholder="Image URL"
            value={course.imgUrl}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded-md"
            type="number"
            name="price"
            placeholder="Price"
            value={course.price}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            name="duration"
            placeholder="Duration"
            value={course.duration}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            name="totalHours"
            placeholder="Total Hours"
            value={course.totalHours}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            name="credential"
            placeholder="Credential"
            value={course.credential}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded-md"
            type="text"
            name="preRequisite"
            placeholder="Pre-Requisite"
            value={course.preRequisite}
            onChange={handleChange}
            required
          />
          <textarea
            className="border p-2 rounded-md col-span-2"
            name="description"
            placeholder="Description"
            value={course.description}
            onChange={handleChange}
            required
          />
          <textarea
            className="border p-2 rounded-md col-span-2"
            name="content"
            placeholder="Course Content (comma separated)"
            value={course.content}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 rounded-md col-span-2"
            type="text"
            name="certification"
            placeholder="Certification"
            value={course.certification}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md col-span-2 hover:bg-blue-600"
          >
            Add Course
          </button>
        </form>
      </div>

      {/* Display Course List */}
      <div className="max-w-4xl mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Courses List</h2>
        <div className="overflow-auto max-h-96">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Title</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Duration</th>
                <th className="border p-2">Credential</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c._id} className="hover:bg-gray-100">
                  <td className="border p-2">{c.title}</td>
                  <td className="border p-2">${c.price}</td>
                  <td className="border p-2">{c.duration}</td>
                  <td className="border p-2">{c.credential}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
