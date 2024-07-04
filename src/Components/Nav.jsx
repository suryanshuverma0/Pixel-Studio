import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();
  const { logOut, authState } = useAuth();



  const handleLogOut = async () => {
    try {
      await logOut();
      localStorage.removeItem("authInfo");
      navigate("/");

    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <nav className="bg-gradient-to-br from-gray-800 to-black h-16 flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center">
        <h1 className="text-2xl text-white font-bold">Pixel Studio</h1>
      </div>
     {authState.isAuth ? <>
      <div className="flex items-center space-x-4">
        <ul className="flex space-x-4">
          <li className="text-white hover:text-blue-400 transition-colors">
            <Link to="/home">Home</Link>
          </li>
          <li className="text-white hover:text-blue-400 transition-colors">
            <Link to="/drawing-panel">Draw</Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>

        <button
          className="text-sm rounded-md px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
     </>:<div></div>}
    </nav>
  );
};

export default Navbar;
