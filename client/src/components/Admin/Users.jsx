import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../../api/userApi";
import UserTable from "./UserTable";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    console.log("Calling fetchUsers..."); // Debugging log
    try {
      const data = await fetchUsers();
      console.log("Fetched users:", data); // Check API response
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const handleDelete = async (id) => {
    if (await deleteUser(id)) {
      setUsers(users.filter((user) => user._id !== id)); // Remove user from list
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Users List</h1>
      <UserTable users={users} handleDelete={handleDelete} />
    </div>
  );
};

export default Users;
