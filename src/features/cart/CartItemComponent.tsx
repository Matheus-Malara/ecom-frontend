import type {CartItem} from "@/types/cart";
import {removeFromCart, updateCartItem} from "@/services/cartApi";
import {useContext} from "react";
import {CartContext} from "./CartContext";
import {toast} from "react-toastify";

interface CartItemProps {
    item: CartItem;
}

const CartItemComponent = ({item}: CartItemProps) => {
    const {setCart} = useContext(CartContext);

    const handleRemove = async () => {
        try {
            const updatedCart = await removeFromCart(item.productId);
            setCart(updatedCart);
            toast.success("Product removed from cart");
        } catch (err) {
            console.error("Failed to remove item:", err);
            toast.error("Failed to remove product");
        }
    };

    const handleUpdateQuantity = async (newQuantity: number) => {
        if (newQuantity < 1) return;
        try {
            const updatedCart = await updateCartItem(item.productId, newQuantity);
            setCart(updatedCart);
        } catch (err) {
            console.error("Failed to update quantity:", err);
            toast.error("Failed to update quantity");
        }
    };

    return (
        <div className="flex gap-4 border-b pb-4 mb-4">
            <img src={item.imageUrl} alt={item.productName} className="w-20 h-20 rounded object-cover"/>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{item.productName}</h3>
                    <span className="text-green-600 font-semibold">
                        ${item.totalPrice.toFixed(2)}
                    </span>
                </div>
                <p className="text-gray-500 text-sm">
                    ${item.pricePerUnit.toFixed(2)} each
                </p>

                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={() => handleUpdateQuantity(item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                        onClick={() => handleUpdateQuantity(item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={handleRemove}
                    className="text-red-500 text-sm hover:underline mt-1 block"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItemComponent;
