import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const CitizenDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Citizen Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <Link to={"/report"}>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Report an Incident</h2>
            <p className="text-gray-700">Create and submit a new security incident report.</p>
          </CardContent>
            </Link>
        </Card>
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">My Reports</h2>
            <p className="text-gray-700">View all incidents you have reported and their statuses.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CitizenDashboard;
