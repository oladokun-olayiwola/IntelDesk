import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const OfficerDashboard = ({ role }: { role: 'officer' | 'supervisor' }) => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        {role === 'supervisor' ? 'Supervisor' : 'Officer'} Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/incidents" aria-label="View Incident Queue">
          <Card className="transition-all duration-200 hover:shadow-lg border border-blue-100 bg-white rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">Incident Queue</h2>
              <p className="text-gray-600">
                View and manage pending and ongoing incidents.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/criminal/profile" aria-label="Add Criminal Profile">
          <Card className="transition-all duration-200 hover:shadow-lg border border-red-100 bg-white rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-red-700 mb-2">Add Criminal Profile</h2>
              <p className="text-gray-600">
                Register a new suspect or criminal in the system.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default OfficerDashboard;
