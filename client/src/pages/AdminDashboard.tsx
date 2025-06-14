import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import api from "@/lib/api";

interface Incident {
  _id: string;
  title: string;
  status: string;
  reported_by?: {
    name?: string;
  };
  createdAt: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        const [usersRes, incidentsRes] = await Promise.all([
          api.get("/api/users"),
          api.get("/api/incidents"),
        ]);
        setUsers(usersRes.data || []);
        setIncidents(Array.isArray(incidentsRes.data) ? incidentsRes.data : []);
    };

    fetchData();
  }, []);

  const openIncidents = Array.isArray(incidents)
  ? incidents.filter((i) => i.status === "pending")
  : [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-4xl font-bold text-blue-600">{users.length}</p>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Total Incidents</h2>
            <p className="text-4xl font-bold text-blue-600">{incidents.length}</p>
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Open Incidents</h2>
            <p className="text-4xl font-bold text-yellow-600">{openIncidents.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Recent Incidents</h2>
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Status</th>
                <th className="p-3">Reported By</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
  {Array.isArray(incidents) ? (
    incidents.slice(0, 5).map((incident: any) => (
      <tr key={incident._id} className="border-t">
        <td className="p-3">{incident.title}</td>
        <td className="p-3 capitalize">{incident.status}</td>
        <td className="p-3">{incident.reported_by?.name || "N/A"}</td>
        <td className="p-3">{new Date(incident.createdAt).toLocaleDateString()}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={4} className="p-3 text-center text-gray-500">
        No incidents found.
      </td>
    </tr>
  )}
</tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
