import {useEffect, useState} from "react";
import {getUserOrders, cancelOrder} from "@/services/orderApi";
import type {Order} from "@/types/order";
import type {Page} from "@/types/paginated";
import {toast} from "react-toastify";

export default function OrderHistoryTab() {
    const [ordersPage, setOrdersPage] = useState<Page<Order>>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(0);
    const [cancelingId, setCancelingId] = useState<number | null>(null);

    const fetchOrders = () => {
        setLoading(true);
        getUserOrders(page, 5)
            .then((res) => {
                setOrdersPage(res.data);
                setError(false);
            })
            .catch(() => {
                console.error("Failed to fetch orders");
                setError(true);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, [page]);

    const handleCancelOrder = async (orderId: number) => {
        if (!confirm("Are you sure you want to cancel this order?")) return;

        try {
            setCancelingId(orderId);
            await cancelOrder(orderId);
            toast.success(`Order #${orderId} cancelled successfully.`);
            fetchOrders(); // refetch the current page
        } catch (err) {
            console.error(err);
            toast.error("Failed to cancel the order.");
        } finally {
            setCancelingId(null);
        }
    };

    if (loading) return <p className="py-10 text-center">Loading order history...</p>;
    if (error) return <p className="py-10 text-center text-red-500">Failed to load orders.</p>;
    if (!ordersPage || ordersPage.content.length === 0)
        return <p className="py-10 text-center text-gray-500">No orders found.</p>;

    return (
        <div className="space-y-6">
            {ordersPage.content.map((order) => {
                const canCancel = ["PENDING", "PAID"].includes(order.status);

                return (
                    <div key={order.id} className="border rounded p-4 bg-white shadow space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-semibold">Order #{order.id}</span>
                            <span className="text-sm text-gray-500">
                                {new Date(order.createdAt).toLocaleString(undefined, {
                                    dateStyle: "short",
                                    timeStyle: "short",
                                })}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm text-gray-600">
                            <span>
                                Status:{" "}
                                <strong className={order.status === "CANCELLED" ? "text-red-600" : ""}>
                                    {order.status}
                                </strong>
                            </span>
                            <span>Total: <strong>${order.totalAmount.toFixed(2)}</strong></span>
                        </div>


                        <div className="flex flex-col divide-y divide-gray-200 mt-2">
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 py-4 first:pt-0 first:border-none"
                                >
                                    <img
                                        src={item.imageUrl}
                                        alt={item.productName}
                                        className="w-16 h-16 object-contain rounded border"
                                    />
                                    <div>
                                        <div className="font-medium">{item.productName}</div>
                                        <div className="text-sm text-gray-500">
                                            Qty: {item.quantity} x ${item.pricePerUnit.toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {canCancel && (
                            <button
                                onClick={() => handleCancelOrder(order.id)}
                                disabled={cancelingId === order.id}
                                className="mt-2 px-4 py-2 rounded bg-red-100 hover:bg-red-200 text-red-600 text-sm font-semibold disabled:opacity-60"
                            >
                                {cancelingId === order.id ? "Cancelling..." : "Cancel Order"}
                            </button>
                        )}
                    </div>
                );
            })}

            {ordersPage.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({length: ordersPage.totalPages}).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`px-3 py-1 rounded ${
                                i === page ? "bg-blue-600 text-white" : "bg-gray-200"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
