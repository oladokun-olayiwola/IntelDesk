import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Card } from "@/components/ui/card";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface Officer {
  _id: string;
  fullName: string;
  email: string;
}

interface Incident {
  _id: string;
  title: string;
}

const ManageOfficers = () => {
    const { role } = useAuth()
  const navigate = useNavigate();

  const [officers, setOfficers] = useState<Officer[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== "supervisor") {
      toast.error("Access denied");
      navigate("/");
    }
  }, [role, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [officersRes, incidentsRes] = await Promise.all([
          api.get("users?role=officer"),
          api.get("incidents?unassigned=true"),
        ]);
        setOfficers(officersRes.data.data);
        setIncidents(incidentsRes.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssign = async (officerId: string) => {
    const incidentId = assignments[officerId];
    if (!incidentId) return toast.error("Please select an incident.");

    try {
      await api.put(`/incidents/${incidentId}`, { assigned_to: officerId });
      toast.success("Incident assigned.");

      setIncidents((prev) => prev.filter((i) => i._id !== incidentId));
      setAssignments((prev) => ({ ...prev, [officerId]: "" }));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to assign incident.");
    }
  };

  if (loading) return <p className="p-6 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Manage Officers</h1>

      <Card className="p-4 overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Assign Incident</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {officers.map((officer) => (
              <tr key={officer._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{officer.fullName}</td>
                <td className="p-3">{officer.email}</td>
                <td className="p-3">
                  <select
                    className="border rounded p-1 w-full"
                    value={assignments[officer._id] || ""}
                    onChange={(e) =>
                      setAssignments((prev) => ({
                        ...prev,
                        [officer._id]: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select incident</option>
                    {incidents.map((incident) => (
                      <option key={incident._id} value={incident._id}>
                        {incident.title}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleAssign(officer._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ManageOfficers;
