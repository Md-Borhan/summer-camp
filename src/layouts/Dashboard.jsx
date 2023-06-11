import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar";
import { useAuth } from "../hooks/useAuth";
import Loader from "../loader/Loader";

const Dashboard = () => {
  const { loading } = useAuth();
  return (
    <div className="relative min-h-screen md:flex">
      {loading && <Loader />}
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
