import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authActions";
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    const { role } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (role === "admin") navigate("/admin");
        else if (role === "analyst") navigate("/analyst");
        else if (role === "user") navigate("/user");
    }, [role, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border mb-4 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border mb-4 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
                <div className="flex justify-between text-sm mt-2">
                    <button
                        onClick={() => navigate("/forgot-password")}
                        className="text-blue-600 hover:underline"
                    >
                        Forgot Password?
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        className="text-blue-600 hover:underline"
                    >
                        Don't have an account? Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;