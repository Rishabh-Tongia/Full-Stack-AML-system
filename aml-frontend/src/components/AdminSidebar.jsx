import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        window.location.href = "/";
    };

    return (
        <div className="w-60 h-screen bg-gray-900 text-white p-5">

            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

            <ul className="space-y-4">

                <li>
                    <Link to="/admin">Dashboard</Link>
                </li>

                <li>
                    <Link to="/admin/create-analyst">Create Analyst</Link>
                </li>

                <li>
                    <Link to="/admin/cases">Cases</Link>
                </li>

                <li>
                    <button onClick={logout}>Logout</button>
                </li>

            </ul>

        </div>
    );
}