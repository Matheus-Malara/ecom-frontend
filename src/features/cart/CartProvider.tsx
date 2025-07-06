import {useState, useEffect} from "react";
import {CartContext} from "./CartContext";
import type {Cart} from "@/types/cart";
import {fetchCart} from "@/services/cartApi";

const ANONYMOUS_ID_KEY = "anonymousId";

export const CartProvider = ({children}: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Cart | null>(null);

    useEffect(() => {
        const anonymousId = localStorage.getItem(ANONYMOUS_ID_KEY);

        if (!anonymousId) {
            const newId = crypto.randomUUID();
            localStorage.setItem(ANONYMOUS_ID_KEY, newId);
        }

        fetchCart()
            .then(setCart)
            .catch((err) => {
                console.error("Erro ao buscar carrinho:", err);
                setCart(null);
            });
    }, []);

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    );
};
