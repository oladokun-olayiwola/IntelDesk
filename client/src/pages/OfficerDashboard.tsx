import { Card, CardContent } from "@/components/ui/card";

const OfficerSupervisorDashboard = ({ role }: { role: 'officer' | 'supervisor' }) => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">{role === 'supervisor' ? 'Supervisor' : 'Officer'} Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Incident Queue</h2>
            <p className="text-gray-700">View and manage pending and ongoing incidents.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Assigned Cases</h2>
            <p className="text-gray-700">Review cases assigned to you or your team.</p>
          </CardContent>
        </Card>

        {role === 'supervisor' && (
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">Manage Officers</h2>
              <p className="text-gray-700">Assign cases, manage roles, and oversee operations.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OfficerSupervisorDashboard;
