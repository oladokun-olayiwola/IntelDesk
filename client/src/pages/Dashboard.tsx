import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/Auth";
import { motion } from "framer-motion";
import { Navigate, useParams } from "react-router-dom";

const Dashboard = () => {
  const { role: urlRole } = useParams<{ role: UserRole }>();
const { role: authRole, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (urlRole !== authRole) {
    return <Navigate to={`/dashboard/${authRole}`} replace />;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">IntelDesk Dashboard</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#home" className="text-gray-700 hover:text-blue-600">Home</a></li>
            <li><a href="#reports" className="text-gray-700 hover:text-blue-600">Reports</a></li>
            <li><a href="#profile" className="text-gray-700 hover:text-blue-600">Profile</a></li>
          </ul>
        </nav>
      </header>

      <main className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Welcome, {authRole.charAt(0).toUpperCase() + authRole.slice(1)}</h2>
          <p className="text-gray-700">
            {authRole === "citizen" && "You can submit and track your security reports."}
            {authRole === "officer" && "You can view and manage assigned reports."}
            {authRole === "supervisor" && "You can oversee all operations and assign tasks."}
          </p>
        </motion.div>
      </main>

      <footer className="bg-white shadow-inner py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} IntelDesk. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
