import {useContext} from "react";
import {CartContext} from "./CartContext";
import CartItemComponent from "./CartItemComponent";

interface CartDrawerProps {
    onClose: () => void;
}

export default function CartDrawer({onClose}: CartDrawerProps) {
    const {cart} = useContext(CartContext);

    if (!cart || cart.items.length === 0) {
        return (
            <div className="p-4 w-96 bg-white shadow-lg rounded relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
                    onClick={onClose}
                >
                    ×
                </button>
                <p className="text-gray-500">Seu carrinho está vazio.</p>
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
            <h2 className="text-xl font-bold mb-4">Meu Carrinho</h2>
            {cart.items.map((item) => (
                <CartItemComponent key={item.productId} item={item}/>
            ))}
            <p className="text-right font-bold text-lg mt-2">
                Total: R$ {cart.totalAmount.toFixed(2)}
            </p>
        </div>
    );
}
