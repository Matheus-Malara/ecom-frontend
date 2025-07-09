import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import {getOrderById} from "@/services/orderApi";
import type {Order} from "@/types/order";

export default function OrderSuccessPage() {
    const {id} = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getOrderById(Number(id))
                .then(setOrder)
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) return <p className="text-center mt-10">Loading order...</p>;
    if (!order) return <p className="text-center mt-10">Order not found.</p>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-green-700 mb-2">Thank you for your purchase!</h1>
            <p className="mb-4">Your order <strong>#{order.id}</strong> was placed successfully.</p>

            <div className="bg-gray-50 border rounded-lg p-4 mb-6">
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>

            <h2 className="text-lg font-semibold mb-2">Items:</h2>
            <ul className="space-y-4">
                {order.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-4 border-b pb-4">
                        {item.imageUrl ? (
                            <img
                                src={item.imageUrl}
                                alt={item.productName}
                                className="w-16 h-16 object-contain rounded"
                            />
                        ) : (
                            <div
                                className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
                                No image
                            </div>
                        )}
                        <div className="flex-1">
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-gray-500">
                                {item.quantity} × ${item.pricePerUnit.toFixed(2)}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex gap-4 mt-6">
                <Link
                    to="/"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full text-center"
                >
                    Back to Home
                </Link>
                <Link
                    to="/orders"
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition w-full text-center"
                >
                    View My Orders
                </Link>
            </div>
        </div>
    );
}