import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Card } from "@/components/ui/card";
import api from "@/lib/api";

interface Criminal {
  _id: string;
  name: string;
  gender: string;
  crimes: string[];
  status: string;
  createdAt: string;
}

const Criminals = () => {
  const [criminals, setCriminals] = useState<Criminal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCriminals = async () => {
      try {
        const res = await api.get("criminals");
        setCriminals(res.data);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to fetch criminals");
      } finally {
        setLoading(false);
      }
    };

    fetchCriminals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Criminal Records</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Card className="overflow-x-auto p-4">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Crimes</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date Added</th>
              </tr>
            </thead>
            <tbody>
              {criminals.map((criminal) => (
                <tr key={criminal._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{criminal.name}</td>
                  <td className="p-3 capitalize">{criminal.gender}</td>
                  <td className="p-3">
                    {criminal.crimes?.length > 0
                      ? criminal.crimes.join(", ")
                      : "N/A"}
                  </td>
                  <td className="p-3 capitalize">{criminal.status}</td>
                  <td className="p-3">
                    {new Date(criminal.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {criminals.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    No criminal records found.
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

export default Criminals;
