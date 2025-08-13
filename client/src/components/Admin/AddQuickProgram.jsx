import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { FaEdit } from "react-icons/fa";

const AddQuickProgram = () => {
  const [program, setProgram] = useState({
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

  const [programs, setPrograms] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState(null);

  const API_URL = "http://localhost:8000";

  // Fetch programs on mount
  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    console.log("📡 Fetching quick programs...");
    try {
      const response = await fetch(`${API_URL}/api/quick-programs`);
      console.log("✅ Fetch response status:", response.status);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log("📦 Quick programs fetched:", data);
      setPrograms(data);
    } catch (error) {
      console.error("❌ Error fetching quick programs:", error);
      alert("Failed to fetch quick programs!");
    }
  };

  const handleChange = (e) => {
    setProgram({ ...program, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log("📝 Submitting quick program:", program);

    try {
      let response;
      if (isEditing) {
        console.log(`✏️ Updating program ID: ${editingProgramId}`);
        response = await fetch(
          `${API_URL}/api/quick-programs/${editingProgramId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(program),
          }
        );
      } else {
        console.log("➕ Adding new quick program...");
        response = await fetch(`${API_URL}/api/quick-programs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(program),
        });
      }

      console.log("📡 Server response status:", response.status);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      alert(
        isEditing
          ? "Quick program updated successfully"
          : "Quick program added successfully"
      );

      // Reset form
      setProgram({
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

      setIsEditing(false);
      setEditingProgramId(null);
      fetchPrograms();
    } catch (error) {
      console.error("❌ Error saving quick program:", error);
      alert(error.message || "Failed to save quick program");
    }
  };

  const handleDelete = async (id) => {
    console.log(`🗑 Deleting quick program ID: ${id}`);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/quick-programs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("📡 Delete response status:", response.status);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      alert("Quick program deleted successfully");
      fetchPrograms();
    } catch (error) {
      console.error("❌ Error deleting quick program:", error);
      alert(error.message || "Failed to delete quick program");
    }
  };

  const handleEdit = (selectedProgram) => {
    console.log("✏️ Editing quick program:", selectedProgram);
    setProgram({
      title: selectedProgram.title || "",
      imgUrl: selectedProgram.imgUrl || "",
      price: selectedProgram.price?.toString() || "",

      duration: selectedProgram.duration || "",
      totalHours: selectedProgram.totalHours || "",
      credential: selectedProgram.credential || "",
      preRequisite: selectedProgram.preRequisite || "",
      description: selectedProgram.description || "",
      content: Array.isArray(selectedProgram.content)
        ? selectedProgram.content.join("")
        : selectedProgram.content || "",
      certification: selectedProgram.certification || "",
    });

    setIsEditing(true);
    setEditingProgramId(selectedProgram._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Form */}
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditing ? "Edit Quick Program" : "Add Quick Program"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="title"
              value={program.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="imgUrl"
              value={program.imgUrl}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="number"
              name="price"
              value={program.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="duration"
              value={program.duration}
              onChange={handleChange}
              required
            />
          </div>

          {/* Total Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Hours
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="totalHours"
              value={program.totalHours}
              onChange={handleChange}
              required
            />
          </div>

          {/* Credential */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credential
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="credential"
              value={program.credential}
              onChange={handleChange}
              required
            />
          </div>

          {/* Pre-Requisite */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pre-Requisite
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="preRequisite"
              value={program.preRequisite}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <ReactQuill
              className="bg-white"
              theme="snow"
              value={program.description}
              onChange={(value) =>
                handleChange({ target: { name: "description", value } })
              }
              placeholder="Enter rich formatted description"
            />
          </div>

          {/* Content */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <ReactQuill
              className="bg-white"
              theme="snow"
              value={program.content}
              onChange={(value) =>
                handleChange({ target: { name: "content", value } })
              }
              placeholder="Enter program content"
            />
          </div>

          {/* Certification */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Certification
            </label>
            <input
              className="border p-2 rounded-md w-full"
              type="text"
              name="certification"
              value={program.certification}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <div className="col-span-2">
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600"
            >
              {isEditing ? "Update Quick Program" : "Add Quick Program"}
            </button>
          </div>
        </form>
      </div>

      {/* Program List */}
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Quick Programs List
        </h2>
        <div className="overflow-auto max-h-96">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-2">Title</th>
                <th className="border p-2">Price</th>

                <th className="border p-2">Duration</th>
                <th className="border p-2">Credential</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p) => (
                <tr key={p._id} className="hover:bg-gray-100">
                  <td className="border p-2">{p.title}</td>
                  <td className="border p-2">${p.price}</td>

                  <td className="border p-2">{p.duration}</td>
                  <td className="border p-2">{p.credential}</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
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

export default AddQuickProgram;
