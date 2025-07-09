import { Routes, Route } from "react-router-dom"; // ⬅️ remove o BrowserRouter
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "@/pages/AccountPage.tsx";
import CartReviewPage from "./pages/CartReviewPage";
import CheckoutPage from "./pages/CheckoutPage";
import { useAuth } from "@/features/auth/useAuth";

function App() {
    const { isAuthenticated } = useAuth();
    return (
        <Layout key={isAuthenticated ? "auth" : "guest"}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/user" element={<AccountPage />} />
                <Route path="/cart" element={<CartReviewPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
        </Layout>
    );
}

export default App;
