import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar";
import { useAuth } from "../hooks/useAuth";
import Loader from "../loader/Loader";

const Dashboard = () => {
  const { loading } = useAuth();
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="relative min-h-screen md:flex">
      <Sidebar />
      <div className="flex-1  md:ml-72">
        <div className="m-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
