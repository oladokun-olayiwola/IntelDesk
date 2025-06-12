import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">IntelDesk</h1>
      <nav>
        <ul className="flex space-x-4">
          <li className="text-gray-700 hover:text-blue-600">
            <Link to="/">
              Features
            </Link>
          </li>
          <li className="text-gray-700 hover:text-blue-600">
            <Link to="/">
              About
            </Link>
          </li>
          <li className="text-gray-700 hover:text-blue-600">
            <Link to="/">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
