import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";


const UserAccountDetail = () => {

  const { id } = useParams();

  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch account + transactions
  const fetchData = async () => {
    try {
      const accRes = await API.get(`/api/accounts/${id}`);
      const txRes = await API.get(`/api/transactions/account/${id}`);

      setAccount(accRes.data);
      setTransactions(txRes.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load account data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Transaction Handler
  const handleTransaction = async (e) => {
    e.preventDefault();

    try {

      await API.post("/api/transactions/create", {
        accountId: id,
        type,
        amount: Number(amount)
      });

      alert("Transaction successful");

      setAmount("");

      // Refresh account + transactions
      fetchData();

    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Transaction failed");
      }
    }
  };

  // Loading State
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <>
      <DashboardLayout>
        <div className="max-w-5xl mx-auto p-6 space-y-6">

          {/* Page Title */}
          <h1 className="text-3xl font-bold">
            Account Details
          </h1>

          {account.isFrozen && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded">
              ⚠ This account is frozen due to AML compliance review. Transactions are disabled.
            </div>
          )}

          {/* Account Info */}
          <div className="bg-gray-100 p-4 rounded space-y-2">
            <p><strong>Balance:</strong> ₹{account.balance}</p>
            <p>
              <strong>Frozen:</strong>
              {account.isFrozen ? " Yes" : " No"}
            </p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">
              {error}
            </div>
          )}

          {/* Transaction Form */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              New Transaction
            </h2>

            <form
              onSubmit={handleTransaction}
              className="bg-gray-100 p-4 rounded space-y-4"
            >

              <div>
                <label className="block mb-1">
                  Transaction Type
                </label>

                <select
                  value={type}
                  disabled={account.isFrozen}
                  onChange={(e) => setType(e.target.value)}
                  className="border p-2 w-full"
                >
                  <option value="deposit">Deposit</option>
                  <option value="withdrawal">Withdrawal</option>
                </select>
              </div>

              <div>
                <label className="block mb-1">
                  Amount
                </label>

                <input
                  type="number"
                  value={amount}
                  disabled={account.isFrozen}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border p-2 w-full"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={account.isFrozen}
                className={`px-4 py-2 rounded text-white ${account.isFrozen ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                  }`}
              >
                Submit Transaction
              </button>

            </form>
          </div>

          {/* Transactions Table */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Transactions
            </h2>

            <table className="w-full border mt-6">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">Type</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Risk Score</th>
                  <th className="p-2">Flagged</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id} className="text-center border-t">
                    <td>{tx.type}</td>
                    <td>₹{tx.amount}</td>
                    <td>{tx.riskScore}</td>
                    <td>
                      {tx.isFlagged ? "⚠️ Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default UserAccountDetail;