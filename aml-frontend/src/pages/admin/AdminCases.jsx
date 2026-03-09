import { useEffect, useState } from "react";
import { getAllCases } from "../../services/caseService";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";

const AdminCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const data = await getAllCases();
        setCases(data);
      } catch (err) {
        setError("Failed to fetch cases");
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="flex">
      <AdminSidebar/>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">All Cases</h1>

        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Case Number</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Assigned To</th>
              <th className="p-2 border">Created At</th>
            </tr>
          </thead>

          <tbody>
            {cases.map((c) => (
              <tr key={c._id}
                onClick={() => navigate(`/admin/cases/${c._id}`)}
                className="cursor-pointer hover:bg-gray-100">
                <td className="p-2 border">{c.caseNumber}</td>
                <td className="p-2 border">{c.status}</td>
                <td className="p-2 border">
                  {c.assignedTo ? c.assignedTo.name : "Unassigned"}
                </td>
                <td className="p-2 border">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCases;