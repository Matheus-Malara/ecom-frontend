import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {CartProvider} from "./features/cart/CartProvider";
import {AuthProvider} from "@/features/auth/useAuth.tsx";
import {BrowserRouter} from "react-router-dom"; // ⬅️ mover para cá

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <App/>
                    <ToastContainer
                        position="top-left"
                        autoClose={3000}
                        style={{marginTop: "4rem"}}
                    />
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
