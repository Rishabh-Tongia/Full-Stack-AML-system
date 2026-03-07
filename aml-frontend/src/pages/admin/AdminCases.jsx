import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminCases() {

  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchCases = async () => {

      const res = await API.get("/api/admin/cases");

      setCases(res.data);

    };

    fetchCases();

  }, []);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        AML Cases
      </h1>

      <table className="table-auto w-full border">

        <thead>

          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Risk Score</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {cases.map((c) => (

            <tr key={c._id}>

              <td>{c._id}</td>
              <td>{c.riskScore}</td>
              <td>{c.status}</td>

              <td>

                <button
                  onClick={() =>
                    navigate(`/admin/cases/${c._id}`)
                  }
                  className="text-blue-600"
                >
                  View
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}