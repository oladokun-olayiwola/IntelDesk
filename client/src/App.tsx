import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import Report from './pages/Report';
import ProtectedRoute from './components/ProtectedRoutes';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import CitizenDashboard from './pages/CitizenDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import Criminal from './pages/Criminal';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute allowedRoles={['citizen']} />}>
          <Route path="/dashboard/citizen" element={<CitizenDashboard />} />
          <Route path="/report" element={<Report />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['officer']} />}>
          <Route
            path="/dashboard/officer"
            element={<OfficerDashboard role={'officer'} />}
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['supervisor']} />}>
          <Route path="/dashboard/supervisor" element={<AdminDashboard />} />
        </Route>
        <Route path="/criminal/profile" element={<Criminal />} />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
