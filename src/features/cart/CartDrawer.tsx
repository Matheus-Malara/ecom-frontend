import {useContext} from "react";
import {CartContext} from "./CartContext";
import CartItemComponent from "./CartItemComponent";
import {clearCart} from "@/services/cartApi";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/features/auth/useAuth.tsx";

interface CartDrawerProps {
    onClose: () => void;
}

export default function CartDrawer({onClose}: CartDrawerProps) {
    const {cart, setCart} = useContext(CartContext);
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();

    const handleClearCart = async () => {
        try {
            await clearCart();
            setCart(null);
            toast.success("Cart cleared successfully");
        } catch (err) {
            console.error("Failed to clear cart:", err);
            toast.error("Failed to clear cart");
        }
    };

    const handleCheckout = () => {
        if (!isAuthenticated) {
            toast.info("You need to log in to proceed to checkout");
            navigate("/login");
            return;
        }

        navigate("/checkout");
    };

    if (!cart || cart.items.length === 0) {
        return (
            <div className="p-4 w-96 bg-white shadow-lg rounded relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
                    onClick={onClose}
                >
                    ×
                </button>
                <p className="text-gray-500">Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="p-4 w-96 bg-white shadow-lg rounded relative">
            <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
                onClick={onClose}
            >
                ×
            </button>
            <h2 className="text-xl font-bold mb-4">My Cart</h2>
            <div className="space-y-4">
                {cart.items
                    .slice()
                    .sort((a, b) => a.productName.localeCompare(b.productName))
                    .map((item) => (
                        <CartItemComponent key={item.productId} item={item}/>
                    ))}
            </div>

            <p className="text-right font-bold text-lg mt-2">
                Total: ${cart.totalAmount.toFixed(2)}
            </p>

            <button
                onClick={handleCheckout}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
                Proceed to Checkout
            </button>

            <button
                onClick={handleClearCart}
                className="w-full mt-2 bg-red-100 hover:bg-red-200 text-red-600 font-semibold py-2 px-4 rounded"
            >
                Clear Cart
            </button>
        </div>
    );
}
