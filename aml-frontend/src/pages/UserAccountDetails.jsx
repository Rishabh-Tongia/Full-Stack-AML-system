import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const UserAccountDetail = () => {

  const { id } = useParams();

  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);

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

      await API.post("/api/transactions", {
        accountId: id,
        type,
        amount: Number(amount)
      });

      alert("Transaction successful");

      setAmount("");

      // Refresh account + transactions
      fetchData();

    } catch (error) {
      alert(error.response?.data?.message || "Transaction failed");
    }
  };

  // Loading State
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  // Frozen Account
  if (account.isFrozen) {
    return (
      <div className="p-6">
        <h1 className="text-2xl text-red-500 font-semibold">
          Account is frozen due to compliance review
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* Page Title */}
      <h1 className="text-3xl font-bold">
        Account Details
      </h1>

      {/* Account Info */}
      <div className="bg-gray-100 p-4 rounded space-y-2">
        <p><strong>Balance:</strong> ₹{account.balance}</p>
        <p>
          <strong>Frozen:</strong>
          {account.isFrozen ? " Yes" : " No"}
        </p>
      </div>

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
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
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

        <table className="min-w-full border">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Risk Score</th>
              <th className="p-2 border">Flagged</th>
            </tr>
          </thead>

          <tbody>

            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center">
                  No transactions yet
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t._id}>
                  <td className="p-2 border">{t.type}</td>
                  <td className="p-2 border">₹{t.amount}</td>
                  <td className="p-2 border">{t.riskScore}</td>
                  <td className="p-2 border">
                    {t.isFlagged ? "⚠ Yes" : "No"}
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>
      </div>

    </div>
  );
};

export default UserAccountDetail;