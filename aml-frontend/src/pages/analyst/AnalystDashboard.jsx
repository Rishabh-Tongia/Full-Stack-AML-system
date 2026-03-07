import { useEffect, useState } from "react";
import API from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function AnalystDashboard() {

  const [transactions, setTransactions] = useState([]);

  const fetchFlagged = async () => {
    try {

      const res = await API.get("/api/transactions/flagged");

      setTransactions(res.data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFlagged();
  }, []);

  return (
    <DashboardLayout>

      <h1 className="text-2xl font-bold mb-6">
        Flagged Transactions
      </h1>

      <table className="w-full border">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Account</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Risk Score</th>
            <th className="p-2 border">Flagged</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map((t) => (

            <tr key={t._id}>
              <td className="p-2 border">{t.accountId}</td>
              <td className="p-2 border">₹{t.amount}</td>
              <td className="p-2 border">{t.riskScore}</td>
              <td className="p-2 border">
                {t.isFlagged ? "⚠ Yes" : "No"}
              </td>
            </tr>

          ))}

        </tbody>

      </table>

    </DashboardLayout>
  );
}