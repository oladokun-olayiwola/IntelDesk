import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 p-6">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Page Not Found</p>
      <Link
        to="/"
        className="text-blue-600 hover:underline text-lg font-medium"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
