import { useState } from "react";
import API from "../services/api";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        try {
            await API.post("/api/auth/forgot-password", { email });
            setMessage("If that email exists, a reset link has been sent.");
        } catch (err) {
            setMessage("Something went wrong.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl mb-4">Forgot Password</h1>

            <input
                type="email"
                placeholder="Enter your email"
                className="border p-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 mt-3"
            >
                Send Reset Link
            </button>
        </div>
    );
};

export default ForgotPassword;