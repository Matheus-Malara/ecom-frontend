import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "@/features/cart/CartDrawer";
import {useState} from "react";
import type {ReactNode} from "react";

type Props = {
    children: ReactNode;
};

export default function Layout({children}: Props) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen relative">
            <Header onCartClick={() => setIsCartOpen(true)}/>
            <main className="flex-1">{children}</main>
            <Footer/>

            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-50"
                    onClick={() => setIsCartOpen(false)}
                >
                    <div
                        className="absolute right-0 top-0 h-full bg-white shadow-lg z-50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CartDrawer onClose={() => setIsCartOpen(false)}/>
                    </div>
                </div>
            )}
        </div>
    );
}
