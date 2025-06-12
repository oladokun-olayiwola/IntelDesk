import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("citizen");

  const handleLogin = () => {
    if (role === "officer") {
      window.location.href = "/dashboard/officer";
    } else if (role === "supervisor") {
      window.location.href = "/dashboard/supervisor";
    } else {
      window.location.href = "/dashboard/user";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar/>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white shadow-lg rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            {isLogin ? "Login to IntelDesk" : "Register for IntelDesk"}
          </h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="citizen">Citizen</option>
                <option value="officer">Officer</option>
                <option value="supervisor">Supervisor</option>
              </select>
            </div>
            <Button type="submit" className="w-full">{isLogin ? "Login" : "Register"}</Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </motion.div>
      </main>

      <footer className="bg-white shadow-inner py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} IntelDesk. All rights reserved.
      </footer>
    </div>
  );
};

export default Auth;
