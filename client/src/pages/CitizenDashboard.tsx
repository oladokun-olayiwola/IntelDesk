import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const CitizenDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Citizen Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/report">
          <Card className="hover:shadow-lg transition">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Report an Incident</h2>
              <p className="text-gray-700">Create and submit a new security incident report.</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/my-incidents">
          <Card className="hover:shadow-lg transition">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">My Reports</h2>
              <p className="text-gray-700">View all incidents you have reported and their statuses.</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/criminals">
          <Card className="hover:shadow-lg transition">
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">View Suspects</h2>
              <p className="text-gray-700">Browse the list of known criminals and suspects.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default CitizenDashboard;
