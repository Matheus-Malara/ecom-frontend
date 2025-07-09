import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {createOrder} from "@/services/orderApi";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const processOrder = async () => {
            try {
                const order = await createOrder();
                navigate(`/order-success/${order.id}`);
            } catch (err) {
                console.error("Checkout failed:", err);
                setError("Something went wrong during checkout. Please try again.");
            }
        };

        processOrder();
    }, [navigate]);

    if (error) {
        return (
            <div className="max-w-2xl mx-auto p-6 text-center">
                <p className="text-red-600 font-semibold mb-4">{error}</p>
                <button
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                    onClick={() => navigate("/cart")}
                >
                    Back to Cart
                </button>
            </div>
        );
    }

    return <p className="text-center mt-10 text-lg">Finalizing your order...</p>;
}
