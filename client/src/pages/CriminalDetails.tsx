import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';
import { BASE_URL } from '@/constants';

const CriminalDetails = () => {
  const { id } = useParams();
  const [criminal, setCriminal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCriminal = async () => {
      try {
        const res = await api.get(`/criminals/${id}`);
        setCriminal(res.data);
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchCriminal();
  }, [id]);

  if (loading) return <p className="p-6">Loading criminal details...</p>;
  if (!criminal) return <p className="p-6 text-red-500">Criminal not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      {criminal.photo && (
        <img
          src={`${BASE_URL}${criminal.photo}`}
          alt="Criminal/Suspect image"
          className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
        />
      )}

      <h2 className="text-2xl font-bold mb-4">{criminal.name}</h2>

      <p>
        <strong>Gender:</strong> {criminal.gender}
      </p>
      <p>
        <strong>Alias:</strong> {criminal.alias || 'N/A'}
      </p>
      <p>
        <strong>Status:</strong> {criminal.status}
      </p>
      <p>
        <strong>Crimes:</strong> {criminal.crimes?.join(', ')}
      </p>
      <p>
        <strong>Case ID:</strong> {criminal.caseID}
      </p>
      <p>
        <strong>Charged to Court:</strong>{' '}
        {criminal.chargedToCourt ? 'Yes' : 'No'}
      </p>
      <p>
        <strong>Bailed:</strong> {criminal.bailed ? 'Yes' : 'No'}
      </p>

      {criminal.bailed && criminal.surety && (
        <>
          <h3 className="font-semibold mt-4">Surety Details</h3>
          <p>
            <strong>Name:</strong> {criminal.surety.fullName}
          </p>
          <p>
            <strong>Address:</strong> {criminal.surety.address}
          </p>
          <p>
            <strong>Phone:</strong> {criminal.surety.phoneNumber}
          </p>
        </>
      )}
    </div>
  );
};

export default CriminalDetails;
