import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import AnalystLayout from "../../layouts/AnalystLayout";
const AnalystCases = () => {

  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchCases = async () => {

      const res = await API.get("/api/analyst/cases");

      setCases(res.data);

    };

    fetchCases();

  }, []);

  return (

    <>
      <h1 className="text-3xl font-bold mb-6">
        My Assigned Cases
      </h1>

      <table className="min-w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Case No</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Risk Score</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>

        <tbody>

          {cases.map((c) => (

            <tr
              key={c._id}
              onClick={() => navigate(`/analyst/case/${c._id}`)}
              className="hover:bg-gray-100 cursor-pointer"
            >

              <td className="p-2 border">{c.caseNumber}</td>

              <td className="p-2 border">
                {c.account?.user?.name}
              </td>

              <td className="p-2 border">
                {c.account?.user?.email}
              </td>

              <td className="p-2 border">
                {c.totalRiskScore}
              </td>

              <td className="p-2 border">
                {c.status}
              </td>
              
              <td className="p-2 border">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/analyst/case/${c._id}`);
                  }}
                  className="text-blue-600"
                >
                  View
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </>

  );
};

export default AnalystCases;