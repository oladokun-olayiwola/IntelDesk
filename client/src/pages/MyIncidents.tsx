import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Card } from "@/components/ui/card";
import api from "@/lib/api";
import { getUserIdFromToken } from "@/lib/utils";

interface Incident {
  created_at: string | number | Date;
  _id: string;
  title: string;
  description: string;
  status: string;
}

const MyIncidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchUserIncidents = async () => {
      try {
        const res = await api.get(`incidents/reporter/${userId}`);
        console.log(res.data);
        
        setIncidents(res.data.data);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to fetch your incidents");
      } finally {
        setLoading(false);
      }
    };

    fetchUserIncidents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">My Reported Incidents</h1>

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
                <th className="p-3">Date Reported</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr key={incident._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{incident.title}</td>
                  <td className="p-3 text-gray-700">{incident.description}</td>
                  <td className="p-3 capitalize">{incident.status}</td>
                  <td className="p-3">{new Date(incident.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {incidents.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-3 text-center text-gray-500">
                    You haven't reported any incidents.
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

export default MyIncidents;
