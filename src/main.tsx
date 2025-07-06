import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {CartProvider} from "./features/cart/CartProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <CartProvider>
            <App/>
            <ToastContainer position="top-right" autoClose={3000}/>
        </CartProvider>
    </React.StrictMode>
);
