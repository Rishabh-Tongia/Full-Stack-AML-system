import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function UserDashboard() {

  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  const fetchAccounts = async () => {
    try {
      const res = await API.get("/api/accounts/my");
      setAccounts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <DashboardLayout>

      <h1 className="text-2xl font-bold mb-6">
        My Accounts
      </h1>

      <div className="grid grid-cols-2 gap-4">

        {accounts.map((acc) => (

          <div
            key={acc._id}
            className="bg-white shadow p-4 rounded cursor-pointer"
            onClick={() => navigate(`/user/accounts/${acc._id}`)}
          >

            <p className="font-semibold">
              Account ID: {acc._id}
            </p>

            <p>
              Balance: ₹{acc.balance}
            </p>

            <p>
              Status: {acc.isFrozen ? "Frozen" : "Active"}
            </p>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}