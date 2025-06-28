import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import Report from "./pages/Report";
import ProtectedRoute from "./components/ProtectedRoutes";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import CitizenDashboard from "./pages/CitizenDashboard";
import OfficerDashboard from "./pages/OfficerDashboard";
import CriminalProfileForm from "./pages/CriminalProfileForm";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Incidents from "./pages/Incidents";
import MyIncidents from "./pages/MyIncidents";
import Criminals from "./pages/Criminals";
import Contact from "./pages/Contacts";
import About from "./pages/About";
import Features from "./pages/Features";
import ManageOfficers from "./pages/ManageOfficers";
import CriminalDetails from "./pages/CriminalDetails";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Shared Layout with Navbar */}
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="features" element={<Features />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />

          {/* Citizen Routes */}
          <Route element={<ProtectedRoute allowedRoles={['citizen']} />}>
            <Route path="/dashboard/citizen" element={<CitizenDashboard />} />
            <Route path="/report" element={<Report />} />
            <Route path="/my-incidents" element={<MyIncidents />} />
          </Route>

          {/* Officer Routes */}
          <Route element={<ProtectedRoute allowedRoles={['officer']} />}>
            <Route path="/dashboard/officer" element={<OfficerDashboard role="officer" />} />
            <Route path="/criminal/profile" element={<CriminalProfileForm />} />
          </Route>

          {/* Supervisor Routes */}
          <Route element={<ProtectedRoute allowedRoles={['supervisor']} />}>
            <Route path="/dashboard/supervisor" element={<SupervisorDashboard />} />
            <Route path="/officers/manage" element={<ManageOfficers />} />
          </Route>

          {/* Shared Protected Routes (officer + supervisor) */}
          <Route element={<ProtectedRoute allowedRoles={['officer', 'supervisor']} />}>
            <Route path="/incidents" element={<Incidents />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['officer', 'supervisor', "citizen"]} />}>
            <Route path="/criminals" element={<Criminals />} />
            <Route path="/criminal/:id" element={<CriminalDetails />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
