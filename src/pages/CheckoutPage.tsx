import {useContext, useState} from "react";
import {CartContext} from "@/features/cart/CartContext";
import CartItemComponent from "@/features/cart/CartItemComponent";
import {createOrder} from "@/services/orderApi";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function CheckoutPage() {
    const {cart, setCart} = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!cart || cart.items.length === 0) {
            toast.error("Cart is empty");
            return;
        }

        try {
            setLoading(true);
            const order = await createOrder();
            setCart(null);
            navigate(`/order-success/${order.id}`);
        } catch (err) {
            console.error("Checkout failed:", err);
            toast.error("Something went wrong during checkout");
        } finally {
            setLoading(false);
        }
    };

    if (!cart || cart.items.length === 0) {
        return (
            <div className="max-w-2xl mx-auto p-6 text-center">
                <p className="text-gray-600 mb-4">Your cart is empty.</p>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Review Your Order</h1>

            <div className="space-y-4">
                {cart.items
                    .slice()
                    .sort((a, b) => a.productName.localeCompare(b.productName)) // mesma ordenação
                    .map((item) => (
                        <CartItemComponent key={item.productId} item={item}/>
                    ))}
            </div>


            <p className="text-right font-bold text-xl mt-6">
                Total: ${cart.totalAmount.toFixed(2)}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
                <button
                    onClick={() => navigate("/")}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded w-full sm:w-auto"
                >
                    Back to Home
                </button>

                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded w-full sm:w-auto disabled:opacity-60"
                >
                    {loading ? "Processing..." : "Checkout"}
                </button>
            </div>
        </div>
    );
}