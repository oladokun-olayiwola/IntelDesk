import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
// import { useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
import api from '@/lib/api';
import toast from 'react-hot-toast';

// const markerIcon = new L.Icon({
//   iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
// });

// const LocationPicker = ({
//   setCoordinates,
// }: {
//   setCoordinates: (coords: [number, number]) => void;
// }) => {
//   useMapEvents({
//     click(e) {
//       setCoordinates([e.latlng.lat, e.latlng.lng]);
//     },
//   });
//   return null;
// };

const ReportIncidentPage = () => {
  const { role } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (role !== 'citizen') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">Access denied. Citizens only.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const body = {
      title,
      description,
      address,
    };

    try {
      const res = await api.post('incidents', body);
      if (res.status === 201 || res.status === 200) {
        setMessage('Incident reported successfully.');
        setTitle('');
        setDescription('');
        setAddress('');
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          'An error occurred while reporting the incident'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Report an Incident
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location/address"
              value={address || ''}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {loading ? 'Reporting...' : 'Report Incident'}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ReportIncidentPage;
