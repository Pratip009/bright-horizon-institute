/* eslint-disable react/prop-types */
const UserTable = ({ users, handleDelete }) => {
    return (
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="text-center">
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default UserTable;
  