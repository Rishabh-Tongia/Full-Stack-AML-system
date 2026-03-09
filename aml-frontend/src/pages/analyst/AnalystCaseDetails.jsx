import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../services/api";


function AnalystCaseDetails() {

    const { id } = useParams();
    const [caseData, setCaseData] = useState(null);
    const [noteText, setNoteText] = useState("");

    useEffect(() => {
        fetchCase();
    }, []);

    const fetchCase = async () => {

        try {

            const res = await API.get(`/api/analyst/cases/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            console.log("API DATA:", res.data);   // DEBUG

            setCaseData(res.data);

        } catch (err) {
            console.error("API ERROR:", err);
        }

    };

    const updateStatus = async (status) => {

        try {

            await API.put(`/api/analyst/cases/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            fetchCase();

        } catch (err) {
            console.error(err);
        }

    };

    const addNote = async () => {

        if (!noteText.trim()) return;

        try {

            await API.post(`/api/analyst/cases/${id}/notes`,
                {
                    text: noteText
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

            setNoteText("");

            fetchCase();

        } catch (err) {
            console.error(err);
        }

    };

    if (!caseData) return <div>Loading...</div>;

    return (

        <div className="max-w-4xl bg-white p-6 rounded shadow">

            <h2 className="text-2xl font-bold mb-6">
                Case Details
            </h2>

            <div className="grid grid-cols-2 gap-4">

                <p>
                    <b>Case Number:</b> {caseData.caseNumber}
                </p>

                <p>
                    <b>Status:</b> {caseData.status}
                </p>

                <p>
                    <b>Risk Score:</b> {caseData.totalRiskScore}
                </p>

                <p>
                    <b>Account Number:</b> {caseData.account?.accountNumber}
                </p>

                <p>
                    <b>User:</b> {caseData.account?.user?.name}
                </p>

                <p>
                    <b>Email:</b> {caseData.account?.user?.email}
                </p>

                <h3 className="text-xl font-semibold mt-6">
                    Risk Factors
                </h3>

                <ul className="list-disc ml-6 mt-2">

                    {caseData.totalRiskScore > 100 &&
                        <li>Large transaction amount</li>}

                    {caseData.transactions?.length > 5 &&
                        <li>Multiple transactions detected</li>}

                </ul>

            </div>

            <div className="mt-6 flex gap-3">

                <button
                    onClick={() => updateStatus("underReview")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Start Review
                </button>

                <button
                    onClick={() => updateStatus("escalated")}
                    className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Escalate
                </button>

                <button
                    onClick={() => updateStatus("closed")}
                    className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
                >
                    Close Case
                </button>

            </div>

            <h3 className="text-xl font-semibold mt-6 mb-2">
                Investigation Notes
            </h3>

            <div className="border p-3 bg-gray-50 rounded">

                {caseData.notes?.length === 0 && (
                    <p className="text-gray-500">No notes yet</p>
                )}

                {caseData.notes?.map((note, index) => (

                    <div key={index} className="border-b py-2">

                        <p>{note.text}</p>

                        <p className="text-xs text-gray-500">
                            {new Date(note.addedAt).toLocaleString()}
                        </p>

                    </div>

                ))}

            </div>

            <textarea
                className="w-full border p-2 mt-4"
                rows="3"
                placeholder="Write investigation note..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
            />

            <button
                onClick={addNote}
                className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
            >
                Add Note
            </button>

            <h3 className="text-xl font-semibold mt-8 mb-3">
                Transactions
            </h3>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Risk Score</th>
                        <th>Status</th>
                    </tr>
                </thead>

                
                <tbody>
                    {caseData.transactions?.length > 0 ? (
                        caseData.transactions.map((tx) => (
                            <tr key={tx._id}>
                                <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
                                <td>{tx.type}</td>
                                <td>₹{tx.amount}</td>
                                <td>{tx.riskScore}</td>
                                <td>{tx.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No transactions found</td>
                        </tr>
                    )}
                </tbody>

            </table>

        </div>

    );
}

export default AnalystCaseDetails;