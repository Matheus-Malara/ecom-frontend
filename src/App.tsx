import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "@/pages/AccountPage.tsx";

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/search" element={<SearchPage/>}/>
                    <Route path="/product/:id" element={<ProductDetailsPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/user" element={<AccountPage/>}/>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
