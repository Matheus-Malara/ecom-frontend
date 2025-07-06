import type {CartItem} from "@/types/cart";
import {removeFromCart} from "@/services/cartApi";
import {useContext} from "react";
import {CartContext} from "./CartContext";

interface CartItemProps {
    item: CartItem;
}

const CartItemComponent = ({item}: CartItemProps) => {
    const {setCart} = useContext(CartContext);

    const handleRemove = async () => {
        try {
            const updatedCart = await removeFromCart(item.productId);
            setCart(updatedCart);
        } catch (err) {
            console.error("Erro ao remover item:", err);
        }
    };

    return (
        <div className="flex gap-4 border-b pb-4 mb-4">
            <img src={item.imageUrl} alt={item.productName} className="w-20 h-20 rounded object-cover"/>
            <div className="flex-1">
                <div className="flex justify-between">
                    <h3 className="font-semibold">{item.productName}</h3>
                    <span className="text-green-600 font-semibold">
                        R$ {item.totalPrice.toFixed(2)}
                    </span>
                </div>
                <p className="text-gray-500 text-sm">
                    {item.quantity} × R$ {item.pricePerUnit.toFixed(2)}
                </p>
                <button
                    onClick={handleRemove}
                    className="text-red-500 text-sm hover:underline mt-1"
                >
                    Remover
                </button>
            </div>
        </div>
    );
};

export default CartItemComponent;
