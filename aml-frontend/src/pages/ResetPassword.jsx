import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.put(`/api/auth/reset-password/${token}`, {
        password,
      });

      alert("Password reset successful");
      navigate("/login");

    } catch (err) {
      alert("Invalid or expired link");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

      <input
        type="password"
        placeholder="New Password"
        className="border p-2 w-full mb-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        className="border p-2 w-full mb-3"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;