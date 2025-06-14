import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { BASE_URL } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/types/Auth';
import api from '@/lib/api';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  // const [isLogin, setIsLogin] = useState(true);
  const [rank, setRank] = useState('');
  const [assigned, setAssigned] = useState('');
  const { role, setRole, setIsAuthenticated, isLogin, setIsLogin } = useAuth();
  const navigate = useNavigate();
 
  const handleLogin = async () => {
      const endpoint = isLogin ? 'auth/login' : 'auth/register';
      const payload = isLogin
        ? { email, password }
        : { 
            email, 
            password, 
            fullName, 
            role,
            ...(role === 'supervisor' || role === 'officer') && { rank, assigned }
          };

      const response = await api.post(`${BASE_URL}${endpoint}`, payload);
    
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        setRole(response.data.user.role);
        setIsAuthenticated(true);
        navigate(`/dashboard/${response.data.user.role}`);
      }
  };

  const handleRoleChange = (value: string) => {
    if (isUserRole(value)) {
      setRole(value);
      // Reset rank/assigned when changing role
      if (value !== 'supervisor' && value !== 'officer') {
        setRank('');
        setAssigned('');
      }
    }
  };

  function isUserRole(value: string): value is UserRole {
    return ['citizen', 'officer', 'supervisor', 'admin'].includes(value);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <motion.div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">            {isLogin ? 'Login to IntelDesk' : 'Register for IntelDesk'}
          </h2>
         <form
            className="space-y-4"
            onSubmit={e => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => {
                    setFullName(e.target.value);
                  }}
                  className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
                className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={role}
              onChange={e => handleRoleChange(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md"
            >
              <option value="citizen">Citizen</option>
              <option value="officer">Officer</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {(role === 'supervisor' || role === 'officer') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rank
                </label>
                <input
                  type="text"
                  value={rank}
                  onChange={e => setRank(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assigned
                </label>
                <input
                  type="text"
                  value={assigned}
                  onChange={e => setAssigned(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
            </>
          )}

                       <Button
              type="submit"
              className="w-full cursor-pointer"
              onClick={handleLogin}
            >
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {isLogin ? 'Register' : 'Login'}
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
export default Auth

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { motion } from 'framer-motion';
// import Navbar from '@/components/Navbar';
// import axios from 'axios';
// import { BASE_URL } from '@/constants';
// import { useAuth } from '@/contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { UserRole } from '@/types/Auth';

// const Auth = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [isLogin, setIsLogin] = useState(true);
//   const {} = useAuth();
//   const navigate = useNavigate();
//   const { role, setRole, setIsAuthenticated } = useAuth();
 
//   const handleLogin = async () => {
//     try {
//       const endpoint = isLogin ? 'auth/login' : 'auth/register';
//       const payload = isLogin
//         ? { email, password, role }
//         : { email, password, fullName, role };

//           const response = await axios.post(`${BASE_URL}${endpoint}`, payload);
    
//     if (response.data.token) {
//       localStorage.setItem('authToken', response.data.token);
//       // Make sure these are being called:
//       setRole(role); // Should be 'supervisor' 
//       setIsAuthenticated(true);
      
//       // Add debug logs:
//       console.log('Login successful - role:', role, 'token:', response.data.token);
      
//       navigate(`/dashboard/${role}`);
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//   }
//   };

//   const handleRoleChange = (value: string) => {
//     if (isUserRole(value)) {
//       setRole(value);
//     }
//   };

//   function isUserRole(value: string): value is UserRole {
//     return ['citizen', 'officer', 'supervisor'].includes(value);
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col">
//       <Navbar />

//       <main className="flex-1 flex flex-col items-center justify-center p-6">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="w-full max-w-md bg-white shadow-lg rounded-xl p-8"
//         >
//           <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
//             {isLogin ? 'Login to IntelDesk' : 'Register for IntelDesk'}
//           </h2>
//           <form
//             className="space-y-4"
//             onSubmit={e => {
//               e.preventDefault();
//               handleLogin();
//             }}
//           >
//             {!isLogin && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={fullName}
//                   onChange={e => {
//                     setFullName(e.target.value);
//                   }}
//                   className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             )}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={e => {
//                   setEmail(e.target.value);
//                 }}
//                 className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={e => {
//                   setPassword(e.target.value);
//                 }}
//                 className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Role
//               </label>
//               <select
//                 value={role}
//                 onChange={e => handleRoleChange(e.target.value)}
//                 className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="citizen">Citizen</option>
//                 <option value="officer">Officer</option>
//                 <option value="supervisor">Supervisor</option>
//               </select>
//             </div>
//             <Button
//               type="submit"
//               className="w-full cursor-pointer"
//               onClick={handleLogin}
//             >
//               {isLogin ? 'Login' : 'Register'}
//             </Button>
//           </form>
//           <p className="mt-4 text-center text-sm text-gray-600">
//             {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
//             <button
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-blue-600 hover:underline cursor-pointer"
//             >
//               {isLogin ? 'Register' : 'Login'}
//             </button>
//           </p>
//         </motion.div>
//       </main>

//       <footer className="bg-white shadow-inner py-4 text-center text-gray-500 text-sm">
//         &copy; {new Date().getFullYear()} IntelDesk. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default Auth;