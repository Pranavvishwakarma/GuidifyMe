import { Link } from "react-router-dom";
import { logout } from "../config/firebase";
import { mainLogo } from "../assets";

const NavBar = () => {
  return (
    <div className="h-16 shadow-md shadow-blue-100 flex justify-between items-center px-8">
      <Link to="/">
        <img
          className="h-8"
          src={mainLogo}
          alt=""
        />
      </Link>

      <div className="flex justify-between items-center gap-4">
        <Link
          to="/home"
          className="bg-gray-100 hover:bg-gray-200 py-1.5 px-4 rounded-md"
        >
          Home
        </Link>
        
        <button
          className="bg-red-500 hover:bg-red-600 shadow-red-300 shadow-md py-1.5 px-4 rounded-md text-white font-semibold"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
