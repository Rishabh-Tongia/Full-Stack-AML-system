import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const AdminCaseDetail = () => {
    const { id } = useParams();
    const [caseData, setCaseData] = useState(null);
    const [analysts, setAnalysts] = useState([]);
    const [selectedAnalyst, setSelectedAnalyst] = useState("");

    useEffect(() => {
        const fetchCase = async () => {
            const res = await API.get(`/api/admin/cases/${id}`);
            setCaseData(res.data);
        };
        fetchCase();

        const fetchAnalysts = async () => {
            const res = await API.get("/api/admin/cases/analysts");
            setAnalysts(res.data);
        };
        fetchAnalysts();
    }, [id]);

    if (!caseData) return <div className="p-6">Loading...</div>;

    const handleAssign = async () => {
        try {
            await API.put(`/api/admin/cases/${id}/assign`, {
                analystId: selectedAnalyst
            });
            alert("Case assigned");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClose = async () => {
        try {
            await API.put(`/api/admin/cases/${id}/closed`);
            alert("Case closed");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEscalate = async () => {
        try {
            await API.put(`/api/admin/cases/${id}/escalate`);
            alert("Case escalated");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleReport = async () => {
        try {
            await API.put(`/api/admin/cases/${id}/report`);
            alert("Case reported");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6 space-y-6">

            <h1 className="text-3xl font-bold">
                Case {caseData.caseNumber}
            </h1>

            {/* Overview */}
            <div className="bg-gray-100 p-4 rounded space-y-2">
                <p>
                    <strong>Status:</strong>{" "}
                    <span
                        className={`px-3 py-1 rounded text-white ${caseData.status === "pending"
                            ? "bg-yellow-500"
                            : caseData.status === "underReview"
                                ? "bg-blue-500"
                                : caseData.status === "escalated"
                                    ? "bg-red-600"
                                    : caseData.status === "reported"
                                        ? "bg-purple-600"
                                        : "bg-green-600"
                            }`}
                    >
                        {caseData.status}
                    </span>
                </p>
                <p><strong>Total Risk Score:</strong> {caseData.totalRiskScore}</p>
                <p><strong>Created:</strong> {new Date(caseData.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex flex-wrap gap-4 items-center mt-4">

                {/* Assign Section */}
                <div className="flex gap-2 items-center">
                    <select
                        value={selectedAnalyst}
                        onChange={(e) => setSelectedAnalyst(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">Select Analyst</option>
                        {analysts.map((a) => (
                            <option key={a._id} value={a._id}>
                                {a.name} ({a.email})
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleAssign}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        disabled={caseData.status === "closed"}
                    >
                        Assign
                    </button>
                </div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Close Case
                </button>

                {/* Escalate Button */}
                <button
                    onClick={handleEscalate}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                    disabled={caseData.status === "closed"}
                >
                    Escalate
                </button>

                {/* Report Button */}
                <button
                    onClick={handleReport}
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                    disabled={caseData.status === "closed"}
                >
                    Report
                </button>

            </div>

            {/* Account Info */}
            <div className="bg-blue-50 p-4 rounded space-y-2">
                <h2 className="text-xl font-semibold">Account Info</h2>
                <p>
                    <strong>User:</strong>{" "}
                    {caseData.account?.user?.name || "N/A"}
                </p>

                <p>
                    <strong>Email:</strong>{" "}
                    {caseData.account?.user?.email || "N/A"}
                </p>

                <p>
                    <strong>Balance:</strong>{" "}
                    ₹{caseData.account?.balance ?? "N/A"}
                </p>

                <p>
                    <strong>Frozen:</strong>{" "}
                    {caseData.account?.isFrozen ? "Yes" : "No"}
                </p>
            </div>

            {/* Transactions */}
            <div>
                <h2 className="text-xl font-semibold mb-2">
                    Flagged Transactions
                </h2>

                <table className="min-w-full border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">Type</th>
                            <th className="p-2 border">Amount</th>
                            <th className="p-2 border">Risk Score</th>
                            <th className="p-2 border">Reasons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {caseData.transactions?.map((t) => (
                            <tr key={t._id}>
                                <td className="p-2 border">{t.type}</td>
                                <td className="p-2 border">₹{t.amount}</td>
                                <td className="p-2 border">{t.riskScore}</td>
                                <td className="p-2 border">
                                    {t.flagReasons?.join(", ")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AdminCaseDetail;