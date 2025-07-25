import React, { useEffect, useState } from "react";
import { getAccount, updateAccount } from "@/services/userApi";
import { toast } from "react-toastify";
import { useAuth } from "@/features/auth/useAuth";
import OrderHistoryTab from "@/features/account/OrderHistoryTab";

export default function AccountPage() {
    const { logout, isAuthenticated } = useAuth();
    const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"info" | "orders">("info");

    useEffect(() => {
        if (!isAuthenticated) return;

        getAccount()
            .then(setUser)
            .catch(() => toast.error("Failed to fetch account data"))
            .finally(() => setLoading(false));
    }, [isAuthenticated]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!user) return;
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!user) return;
        setSaving(true);
        try {
            const updated = await updateAccount({
                firstName: user.firstName,
                lastName: user.lastName,
            });
            setUser(updated);
            toast.success("Account updated successfully");
        } catch {
            toast.error("Failed to update account");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-4">Loading account...</div>;
    if (!user) return <div className="p-4 text-red-500">No account data found</div>;

    return (
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-white shadow rounded">
            <div className="flex mb-6 border-b">
                <button
                    onClick={() => setActiveTab("info")}
                    className={`px-4 py-2 font-medium ${activeTab === "info" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                >
                    Account Info
                </button>
                <button
                    onClick={() => setActiveTab("orders")}
                    className={`ml-4 px-4 py-2 font-medium ${activeTab === "orders" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                >
                    Order History
                </button>
            </div>

            {activeTab === "info" && (
                <>
                    <label className="block mb-4">
                        <span className="text-gray-700">First Name</span>
                        <input
                            name="firstName"
                            type="text"
                            value={user.firstName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border rounded"
                        />
                    </label>

                    <label className="block mb-4">
                        <span className="text-gray-700">Last Name</span>
                        <input
                            name="lastName"
                            type="text"
                            value={user.lastName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border rounded"
                        />
                    </label>

                    <label className="block mb-6">
                        <span className="text-gray-700">Email</span>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="mt-1 block w-full px-4 py-2 border rounded bg-gray-100"
                        />
                    </label>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                        onClick={logout}
                        className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </>
            )}

            {activeTab === "orders" && <OrderHistoryTab />}
        </div>
    );
}
