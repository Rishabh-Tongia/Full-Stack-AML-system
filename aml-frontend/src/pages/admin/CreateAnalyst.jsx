import { useState } from "react";
import API from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";

export default function CreateAnalyst() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {

        try {

            await API.post("/api/admin/create-analyst", form);

            alert("Analyst created successfully");

        } catch (error) {

            alert("Error creating analyst");

        }

    };

    return (
        <div className="flex">
            <AdminSidebar />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Create Analyst
                </h1>

                <input
                    name="name"
                    placeholder="Name"
                    className="border p-2 block mb-3"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    className="border p-2 block mb-3"
                    onChange={handleChange}
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border p-2 block mb-3"
                    onChange={handleChange}
                />

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2"
                >
                    Create Analyst
                </button>

            </div>
        </div>

    );
}