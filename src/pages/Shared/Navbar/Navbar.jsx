import { useState } from "react";
import { stack as Menu } from "react-burger-menu";
import openMenu from "../../../assets/icons/menu.png";
import closeMenu from "../../../assets/icons/close.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = useAuth();
  console.log(auth);

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
      <div className="navbar shadow-md h-full w-full bg-[#1f234088] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-dotted border-2 text-white border-[#571ce09f] ">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost normal-case text-2xl">
            <span className="text-[#571ce0] font-bold">
              United
              <span className="text-white font-semibold">Champions</span>
            </span>
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
              <a>Class</a>
            </li>
            <li>
              <Link to="/dashboard">Dashboard </Link>
            </li>
            {auth?.user ? (
              <li onClick={handleLogout}>
                <Link to="/">Logout</Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img title={auth?.user?.displayName} src={auth?.user?.photoURL} />
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
                  <a>Class</a>
                </li>
                <li>
                  <a>Dashboard </a>
                </li>
              </ul>
            </div>
            <div className="navbar-end ml-5">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
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
