import UserTable from '../components/userTable'

const AdminDashboard = () => {
    return (
      <div className="container mt-5">
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard!</p>
        <UserTable />
      </div>

    );
  };
  
  export default AdminDashboard