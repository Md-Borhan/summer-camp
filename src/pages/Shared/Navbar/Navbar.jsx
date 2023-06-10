import { useState } from "react";
import { stack as Menu } from "react-burger-menu";
import openMenu from "../../../assets/icons/menu.png";
import closeMenu from "../../../assets/icons/close.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import avatar from "../../../assets/icons/user.png";
import logo from "../../../assets/icons/logo.png";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();

  const handleLogout = () => {
    auth
      ?.logOut()
      .then(() => {
        toast.success("Logout Success!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      <div className="navbar px-4 md:px-10 flex shadow-md h-full w-full bg-[#1f234088] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-dotted border-2 text-white border-[#571ce09f] ">
        <div className="navbar-start">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a>Instructors</a>
            </li>
            <li>
              <Link to="/class">Class</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="mr-5">
            {auth?.user ? (
              <li className="list-none" onClick={handleLogout}>
                <Link to="/">Logout</Link>
              </li>
            ) : (
              <li className="list-none">
                <Link to="/login">Login</Link>
              </li>
            )}
          </div>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border-[#571ce0] shadow-blue-100 shadow">
              {auth?.user ? (
                <img
                  title={auth?.user?.displayName}
                  src={auth?.user?.photoURL}
                />
              ) : (
                <img title={auth?.user?.displayName} src={avatar} />
              )}
            </div>
          </label>
        </div>
      </div>
      {/* Humburger Menu */}
      <div
        className="md:hidden
      "
      >
        <Menu
          width={280}
          disableAutoFocus
          customBurgerIcon={<img className="menuIcon" src={openMenu} />}
          customCrossIcon={<img className="menuIcon" src={closeMenu} />}
          onStateChange={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="">
            <div className="">
              <a className="btn btn-ghost normal-case text-xl ">
                ChampionsUnited
              </a>
            </div>
            <div className="ml-5">
              <ul className="space-y-2">
                <li>
                  <a>Home</a>
                </li>
                <li>
                  <a>Instructors</a>
                </li>
                <li>
                  <Link to="/class">Class</Link>
                </li>
                <li>
                  <a>Dashboard </a>
                </li>
              </ul>
            </div>
            <div className="navbar-end ml-5">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ">
                  <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </label>
            </div>
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
