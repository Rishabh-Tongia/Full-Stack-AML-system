import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      await API.post("/api/auth/register", formData);
      alert("Registration successful");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="border p-2 w-full mb-3"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="border p-2 w-full mb-3"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="border p-2 w-full mb-3"
        onChange={handleChange}
      />

      <select
        name="role"
        className="border p-2 w-full mb-3"
        onChange={handleChange}
      >
        <option value="user">User</option>
        <option value="analyst">Analyst</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white px-4 py-2 w-full"
      >
        Sign Up
      </button>

      <p className="text-sm mt-3 text-center">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/")}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;