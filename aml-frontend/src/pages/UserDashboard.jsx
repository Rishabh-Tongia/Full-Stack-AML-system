import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await API.get("/api/accounts/my");
      setAccounts(res.data);
    };
    fetchAccounts();
  }, []);

  if (!accounts.length) return <div className="p-6">No accounts found</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Accounts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((acc) => (
          <div
            key={acc._id}
            onClick={() => navigate(`/user/accounts/${acc._id}`)}
            className="bg-white shadow p-5 rounded cursor-pointer hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold capitalize">
              {acc.accountType} Account
            </h2>

            <p className="mt-2 text-lg">
              Balance: ₹{acc.balance}
            </p>

            <p className="mt-1">
              Status: {acc.isFrozen ? "Frozen ❄️" : "Active ✅"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;