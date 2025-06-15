import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const {isAuthenticated, setIsAuthenticated, role } = useAuth()

  const handleLogout = () => {
    // perform logout logic
    console.log("Logging out...");
    setIsAuthenticated(false);
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
<Link to={`/dashboard/${role}`}>
        <img src={logo} alt="IntelDesk Logo" className="h-8 w-auto" />
      </Link>
      <nav className="flex items-center gap-6">
        

        {isAuthenticated ? (
          <div className="relative group cursor-pointer">
            <User className="w-6 h-6 text-gray-700 group-hover:text-blue-600" />

            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        ) : <ul className="flex space-x-4">
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
            <Link to="/features">Features</Link>
          </li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="text-gray-700 hover:text-blue-600 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        }
      </nav>
    </header>
  );
};

export default Navbar;
