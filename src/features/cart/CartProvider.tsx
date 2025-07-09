import {useState, useEffect} from "react";
import {CartContext} from "./CartContext";
import type {Cart} from "@/types/cart";
import {fetchCart} from "@/services/cartApi";
import {useAuth} from "@/features/auth/useAuth";

const ANONYMOUS_ID_KEY = "anonymousId";

export const CartProvider = ({children}: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Cart | null>(null);
    const {isAuthenticated} = useAuth();

    useEffect(() => {
        let anonId = localStorage.getItem(ANONYMOUS_ID_KEY);
        if (!anonId) {
            anonId = crypto.randomUUID();
            localStorage.setItem(ANONYMOUS_ID_KEY, anonId);
        }

        fetchCart()
            .then(setCart)
            .catch((err) => {
                console.error("Erro ao buscar carrinho:", err);
                setCart(null);
            });

    }, [isAuthenticated]);

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    );
};
