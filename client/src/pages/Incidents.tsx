import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Card } from "@/components/ui/card";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface Incident {
  _id: string;
  title: string;
  description: string;
  status: string;
  reported_by?: {
    fullName?: string;
    email?: string;
  };
  created_at: string;
}


const Incidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const {role: userRole} = useAuth()

  const canEditStatus = userRole === "supervisor";

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await api.get("incidents");
        setIncidents(res.data);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to fetch incidents");
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await api.put(`incidents/${id}`, { status: newStatus });
      setIncidents((prev) =>
        prev.map((incident) =>
          incident._id === id ? { ...incident, status: newStatus } : incident
        )
      );
      toast.success("Status updated");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const statusOptions = ["pending", "in progress", "resolved"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">All Incidents</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Card className="overflow-x-auto p-4">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Status</th>
                <th className="p-3">Reported By</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr key={incident._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{incident.title}</td>
                  <td className="p-3">{incident.description}</td>
                  <td className="p-3">
                    {canEditStatus ? (
                      <select
                        className="border rounded p-1"
                        value={incident.status}
                        disabled={updatingId === incident._id}
                        onChange={(e) =>
                          handleStatusChange(incident._id, e.target.value)
                        }
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="capitalize">{incident.status}</span>
                    )}
                  </td>
                  <td className="p-3">{incident.reported_by?.fullName || "N/A"}</td>
                  <td className="p-3">
                    {new Date(incident.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {incidents.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    No incidents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
};

export default Incidents;
