import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchCart} from "@/services/cartApi";
import type {Cart} from "@/types/cart";

export default function CartReviewPage() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart()
            .then(setCart)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className="text-center mt-10">Loading cart...</p>;
    if (!cart || cart.items.length === 0)
        return <p className="text-center mt-10">Your cart is empty.</p>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Cart</h1>

            {cart.items.map((item) => (
                <div
                    key={item.productId}
                    className="flex items-center justify-between gap-4 mb-4 border-b pb-4"
                >
                    <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-16 h-16 object-contain rounded"
                    />
                    <div className="flex-1">
                        <p className="font-semibold">{item.productName}</p>
                        <p className="text-sm text-gray-500">
                            {item.quantity} × ${item.pricePerUnit.toFixed(2)}
                        </p>
                    </div>
                    <p className="font-medium">${item.totalPrice.toFixed(2)}</p>
                </div>
            ))}

            <div className="flex justify-between text-lg font-semibold mt-6 border-t pt-4">
                <span>Total:</span>
                <span>${cart.totalAmount.toFixed(2)}</span>
            </div>

            <button
                className="bg-green-600 text-white w-full py-2 mt-6 rounded hover:bg-green-700 transition"
                onClick={() => navigate("/checkout")}
            >
                Proceed to Checkout
            </button>
        </div>
    );
}
