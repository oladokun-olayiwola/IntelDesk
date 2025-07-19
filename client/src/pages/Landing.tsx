import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Streamline Security Reporting with <span className="text-blue-600">IntelDesk</span>
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            A modern, secure platform for the Nigerian Police Force to log, track, and manage intelligence reports efficiently.
          </p>
          <Button className="px-6 py-3 text-lg rounded-xl"><Link to="/auth">Get Started</Link></Button>
        </motion.div>
      </main>

      {/* <footer className="bg-white shadow-inner py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} IntelDesk. All rights reserved.
      </footer> */}
    </div>
  );
};

export default LandingPage;
