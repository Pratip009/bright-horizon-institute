import axios from "axios";

const API_URL = "http://localhost:8000";

export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found! User may need to log in.");

    const res = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found! User may need to log in.");

    await axios.delete(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};