import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

  return (
    <div className="bg-white shadow p-4 flex justify-end">

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
}