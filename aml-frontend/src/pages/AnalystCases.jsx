import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AnalystCases = () => {
    const [cases, setCases] = useState([]);
    const [noteText, setNoteText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCases = async () => {
            const res = await API.get("/api/admin/cases/my-cases");
            setCases(res.data);
        };
        fetchCases();
    }, []);

    const handleAddNote = async () => {
        if (!noteText.trim()) return;

        try {
            await API.put(`/api/admin/cases/${caseData._id}/notes`, {
                text: noteText,
            });

            setNoteText("");

            // reload case data
            const res = await API.get(`/api/admin/cases/${caseData._id}`);
            setCaseData(res.data);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="max-w-5xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">My Assigned Cases</h1>

                <table className="min-w-full border">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-2 border">Case No</th>
                            <th className="p-2 border">User</th>
                            <th className="p-2 border">Risk Score</th>
                            <th className="p-2 border">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cases.map((c) => (
                            <tr
                                key={c._id}
                                onClick={() => navigate(`/analyst/cases/${c._id}`)}
                                className="cursor-pointer hover:bg-gray-100"
                            >
                                <td className="p-2 border">{c.caseNumber}</td>
                                <td className="p-2 border">
                                    {c.account?.user?.name}
                                </td>
                                <td className="p-2 border">
                                    {c.totalRiskScore}
                                </td>
                                <td className="p-2 border">
                                    {c.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Add Investigation Note */}
                <div className="bg-yellow-50 p-4 rounded space-y-3 mt-6">
                    <h2 className="text-xl font-semibold">Add Investigation Note</h2>

                    <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        className="w-full border p-2 rounded"
                        rows="4"
                        placeholder="Write your investigation note..."
                    />

                    <button
                        onClick={handleAddNote}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Add Note
                    </button>
                </div>
            </div>
        </>
    );
};

export default AnalystCases;