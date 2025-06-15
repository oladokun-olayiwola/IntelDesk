import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SupervisorDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Supervisor Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/incidents">
          <Card className="hover:shadow-lg transition">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Incident Queue</h2>
              <p className="text-gray-700">
                Review and manage all reported incidents, assign them to officers.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/officers/manage">
          <Card className="hover:shadow-lg transition">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Manage Officers</h2>
              <p className="text-gray-700">
                Assign cases, manage officer roles, and monitor their performance.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/criminals">
          <Card className="hover:shadow-lg transition">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">View Criminal Records</h2>
              <p className="text-gray-700">
                Access, review, and manage registered criminal profiles.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
