import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-yellow-50 p-6">
      <h1 className="text-5xl font-bold text-yellow-600 mb-4">Unauthorized</h1>
      <p className="text-lg text-gray-800 mb-6">
        You don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="text-yellow-700 hover:underline text-md font-medium"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
