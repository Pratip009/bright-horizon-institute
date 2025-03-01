import { useState } from "react";
import Sidebar from "./Sidebar";
import Users from "./Users";

const AdminDashboard = () => {
  const [active, setActive] = useState("Users");

  return (
    <div className="flex h-screen">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 p-6">
        {active === "Users" && <Users />}
        {active === "Dashboard" && <h1>Welcome to Admin Panel</h1>}
      </div>
    </div>
  );
};

export default AdminDashboard;
