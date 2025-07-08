import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import api from "@/services/axiosInstance";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/auth/register", form);
            toast.success("Account created successfully!");
            navigate("/login");
        } catch (err: any) {
            console.error("Registration failed:", err);
            toast.error(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <label className="block mb-4">
                    <span className="text-gray-700">First Name</span>
                    <input
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded"
                        required
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700">Last Name</span>
                    <input
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded"
                        required
                    />
                </label>

                <label className="block mb-4">
                    <span className="text-gray-700">Email</span>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded"
                        required
                    />
                </label>

                <label className="block mb-6">
                    <span className="text-gray-700">Password</span>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 block w-full px-4 py-2 border rounded"
                        required
                    />
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    {loading ? "Creating account..." : "Register"}
                </button>
            </form>
        </div>
    );
}
