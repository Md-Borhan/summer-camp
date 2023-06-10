import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaBehanceSquare,
} from "react-icons/fa";
import logo from "../../../assets/icons/logo.png";
const Footer = () => {
  return (
    <div className="footerBg myBg text-white">
      <footer className="footer p-10 md:py-20">
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div>
          <span className="footer-title">Social Links</span>
          <a className="link flex items-center gap-2  link-hover">
            <FaFacebookSquare className="text-lg"></FaFacebookSquare>_Facebook
          </a>
          <a className="link flex items-center gap-2  link-hover">
            <FaInstagramSquare className="text-lg"></FaInstagramSquare>
            _Instagram
          </a>
          <a className="link flex items-center gap-2  link-hover">
            <FaLinkedin className="text-lg"></FaLinkedin>_Linkedin
          </a>
          <a className="link flex items-center gap-2  link-hover">
            <FaBehanceSquare className="text-lg"></FaBehanceSquare>_Behance
          </a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Others Page</span>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/" className="link link-hover">
            Instructor
          </Link>
          <Link to="/" className="link link-hover">
            All Class
          </Link>
          <Link to="/" className="link link-hover">
            Blogs
          </Link>
        </div>
        <div>
          <span className="footer-title">Store Information</span>
          <a className="link link-hover">2005 Your Address Goes Here. 896,</a>
          <a className="link link-hover">
            Address 10010, HGJ Phone/Fax: 0123456789
          </a>
          <a className="link link-hover">Email: demo@example.com</a>
        </div>
      </footer>
      <div className="py-6 bg-[#571ce057]  text-center">
        <p>
          &copy; 2023 <strong>United Champions</strong> made by Borhan
        </p>
      </div>
    </div>
  );
};

export default Footer;
