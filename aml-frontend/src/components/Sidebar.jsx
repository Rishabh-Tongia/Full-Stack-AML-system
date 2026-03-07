import { Link } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div className="w-60 bg-gray-900 text-white min-h-screen p-4">

      <h2 className="text-xl font-bold mb-6">
        AML System
      </h2>

      <div className="space-y-3">

        {role === "user" && (
          <Link to="/user" className="block hover:text-gray-300">
            My Accounts
          </Link>
        )}

        {role === "analyst" && (
          <Link to="/analyst" className="block hover:text-gray-300">
            Case Review
          </Link>
        )}

        {role === "admin" && (
          <Link to="/admin" className="block hover:text-gray-300">
            Admin Dashboard
          </Link>
        )}

      </div>

    </div>
  );
}