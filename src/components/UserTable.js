import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserTable.css";

function UserTable() {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  if (!user) return <Navigate to="/login" />;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const generateAvatar = (name) => {
    const colors = [
      "4285f4",
      "ff9800",
      "795548",
      "9c27b0",
      "607d8b",
      "009688",
      "8bc34a",
      "ff5722",
    ];
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
    const colorIndex = name.length % colors.length;
    return `https://via.placeholder.com/40/${colors[colorIndex]}/ffffff?text=${initials}`;
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">User Dashboard</h1>
        <button className="logout-btn top-right" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date Created</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="user-info">
                    <img
                      src={generateAvatar(user.name)}
                      alt={user.name}
                      className="user-avatar"
                    />
                    <span className="user-name">{user.name}</span>
                  </div>
                </td>
                <td className="user-date">
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </td>
                <td className="user-role">User</td>
                <td>
                  <span className="status-badge status-active">
                    <span className="status-indicator"></span>
                    Active
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn edit-btn" title="Edit">
                      <span className="edit-icon"></span>
                    </button>
                    <button className="action-btn delete-btn" title="Delete">
                      <span className="delete-icon"></span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
