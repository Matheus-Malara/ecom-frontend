import {createContext} from 'react';
import type {Cart} from '@/types/cart';

interface CartContextType {
    cart: Cart | null;
    setCart: (cart: Cart | null) => void;
}

export const CartContext = createContext<CartContextType>({
    cart: null,
    setCart: () => {
    },
});