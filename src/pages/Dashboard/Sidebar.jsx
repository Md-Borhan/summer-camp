import { Link, useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { GiClassicalKnowledge } from "react-icons/gi";
const Sidebar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [isActive, setActive] = useState("false");

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  const handleLogOut = () => {
    auth
      ?.logOut()
      .then(() => {
        toast.success("Logout Success!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      {/* Sidebar Responsive Navbar */}
      <div className="bg-gray-100 text-white flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold"></div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          {isActive ? (
            <AiOutlineBars className="h-5 w-5" />
          ) : (
            <AiOutlineClose className="h-5 w-5" />
          )}
        </button>
      </div>
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#322a71] w-64 space-y-6 px-2 py-4  absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          {/* Profile Info */}
          <div>
            <div className="flex flex-col  items-center mt-6 -mx-2">
              <Link to="/dashboard">
                <img
                  className="object-cover w-24 h-24 border-[#571ce057] shadow-blue-100 shadow border-2  mx-2 rounded-full"
                  src={auth?.user?.photoURL}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
              </Link>
              <Link to="/dashboard">
                <h4 className="mx-2 mt-2 font-medium text-white  hover:underline">
                  {auth?.user?.displayName}
                </h4>
              </Link>
              <Link to="/dashboard">
                <p className="mx-2 mt-1 text-sm font-medium text-white  hover:underline">
                  {auth?.user?.email}
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <hr />
          <button className="flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-gray-300  hover:text-gray-700 transition-colors duration-300 transform">
            <FaUsers className="w-5 h-5" />

            <Link to="/dashboard/allUsers" className="mx-4 font-medium">
              All Users
            </Link>
          </button>
          <button className="flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-gray-300  hover:text-gray-700 transition-colors duration-300 transform">
            <GiClassicalKnowledge className="w-5 h-5" />

            <Link to="/dashboard/allClasses" className="mx-4 font-medium">
              All Classes
            </Link>
          </button>
        </div>

        <div>
          <hr />
          <button
            onClick={handleLogOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
