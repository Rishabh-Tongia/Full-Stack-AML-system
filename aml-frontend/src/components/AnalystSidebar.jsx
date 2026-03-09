import { Link } from "react-router-dom";

export default function AnalystSidebar() {

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.href = "/";
    };

    return (

        <div className="w-60 min-h-screen bg-gray-900 text-white p-5">

            <h2 className="text-xl font-bold mb-6">
                Analyst Panel
            </h2>

            <ul className="space-y-4">

                <li>
                    <Link to="/analyst/cases">Assigned Cases</Link>
                </li>

                <li>
                    <button onClick={logout}>Logout</button>
                </li>

            </ul>

        </div>

    );
}