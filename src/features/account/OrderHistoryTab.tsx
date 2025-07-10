import {useEffect, useState} from "react";
import {getUserOrders} from "@/services/orderApi";
import type {Order} from "@/types/order";

export default function OrderHistoryTab() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserOrders()
            .then((res) => setOrders(res.data.content))
            .catch(() => console.error("Failed to fetch orders"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading order history...</p>;
    if (orders.length === 0) return <p>No orders found.</p>;

    return (
        <div className="space-y-6">
            {orders.map((order) => (
                <div key={order.id} className="border rounded p-4 bg-white shadow">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700 font-semibold">Order #{order.id}</span>
                        <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                        Status: <strong>{order.status}</strong> |
                        Total: <strong>${order.totalAmount.toFixed(2)}</strong>
                    </div>
                    <div className="flex flex-col gap-4 mt-2">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <img src={item.imageUrl} alt={item.productName}
                                     className="w-16 h-16 object-contain rounded border"/>
                                <div>
                                    <div className="font-medium">{item.productName}</div>
                                    <div className="text-sm text-gray-500">
                                        Qty: {item.quantity} x ${item.pricePerUnit.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}