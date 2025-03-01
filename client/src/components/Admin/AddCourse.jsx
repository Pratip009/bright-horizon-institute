import { useState } from "react";

const AddCourse = ({ onSubmit }) => {
  const [course, setCourse] = useState({
    title: "",
    image: "",
    time: "",
    programTime: "",
    certification: "",
    credential: "",
    job: "",
    price: "",
    description: "",
    category: "",
    courseContents: "",
    preRequisites: "",
    totalClockHours: "",
    calendarLength: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please login first.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...course,
          courseContents: course.courseContents.split(",").map(item => item.trim()),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Course added successfully!");
        setCourse({
          title: "",
          image: "",
          time: "",
          programTime: "",
          certification: "",
          credential: "",
          job: "",
          price: "",
          description: "",
          category: "",
          courseContents: "",
          preRequisites: "",
          totalClockHours: "",
          calendarLength: "",
        });
      } else {
        alert(result.message || "Failed to add course");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the course.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Add Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(course).map((key) => (
          <input
            key={key}
            type={key === "totalClockHours" ? "number" : "text"}
            name={key}
            placeholder={key.replace(/([A-Z])/g, " $1").trim()}
            value={course[key]}
            onChange={handleChange}
            className="w-full p-2 border"
            required={["title", "description", "category", "courseContents"].includes(key)}
          />
        ))}

        <button
          type="submit"
          className={`px-4 py-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-600"}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
