import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const UserAccounts = () => {

  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchAccounts = async () => {
      const res = await API.get("/api/accounts/my");
      setAccounts(res.data);
    };

    fetchAccounts();

  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          My Accounts
        </h1>

        <table className="min-w-full border">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Account ID</th>
              <th className="p-2 border">Balance</th>
              <th className="p-2 border">Frozen</th>
            </tr>
          </thead>

          <tbody>

            {accounts.map((acc) => (

              <tr
                key={acc._id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => navigate(`/user/accounts/${acc._id}`)}
              >
                <td className="p-2 border">{acc._id}</td>
                <td className="p-2 border">₹{acc.balance}</td>
                <td className="p-2 border">
                  {acc.isFrozen ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserAccounts;