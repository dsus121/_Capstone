import { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingEmail, setEditingEmail] = useState({}); // Track email changes for each user

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5013/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle email input change
  const handleEmailInputChange = (id, newEmail) => {
    setEditingEmail((prev) => ({
      ...prev,
      [id]: newEmail, // Track the new email for the specific user
    }));
  };

  // Handle email update submission
  const handleEmailSubmit = async (id) => {
    const newEmail = editingEmail[id];
    if (!newEmail) {
      setError("Email cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5013/api/users/${id}`, { // Full backend URL
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newEmail }),
      });
      if (!response.ok) {
        throw new Error("Failed to update email");
      }
      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, email: newEmail } : user
        )
      );
      setSuccess("Email updated successfully.");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(`Error updating email: ${error.message}`);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5013/api/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      setSuccess(`User with ID ${id} deleted successfully.`);
      setTimeout(() => setSuccess(null), 3000); // Clear success message after 3 seconds
    } catch (error) {
      setError(`Error deleting user: ${error.message}`);
    }
  };

  return (
    <div>
      {/* Display alert messages */}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* User table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="2">Loading...</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>
                  <input
                    type="text"
                    value={editingEmail[user._id] || user.email} // Use the tracked email or the current email
                    onChange={(e) =>
                      handleEmailInputChange(user._id, e.target.value)
                    }
                    className="form-control"
                  />
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleEmailSubmit(user._id)}
                  >
                    Update
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
