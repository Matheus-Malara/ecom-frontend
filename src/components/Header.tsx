import {ShoppingCart, Menu, X, Search, UserCircle} from "lucide-react";
import {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CartContext} from "@/features/cart/CartContext";
import {useAuth} from "@/features/auth/useAuth";

interface HeaderProps {
    onCartClick: () => void;
}

export default function Header({onCartClick}: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const {cart} = useContext(CartContext);
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const renderCartIcon = () => (
        <div className="relative cursor-pointer" onClick={onCartClick}>
            <ShoppingCart className="w-6 h-6"/>
            {cart && cart.totalItems > 0 && (
                <span
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.totalItems}
                </span>
            )}
        </div>
    );

    const renderAuthOption = () =>
        isAuthenticated ? (
            <span title="My Account" className="cursor-pointer" onClick={() => navigate("/user")}>
                <UserCircle className="w-6 h-6 text-gray-700 hover:text-yellow-600"/>
            </span>
        ) : (
            <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-yellow-600">
                Login
            </Link>
        );

    return (
        <header className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-yellow-500">
                    MEGA SUPPS
                </Link>

                <nav className="hidden md:flex gap-6 items-center font-medium text-gray-700">
                    <a href="/">Home</a>
                    <Link to="/search" className="flex items-center gap-1 hover:text-yellow-600">
                        <Search className="w-5 h-5"/>
                        Search
                    </Link>
                    {renderCartIcon()}
                    {renderAuthOption()}
                </nav>

                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </button>
            </div>

            {menuOpen && (
                <nav className="md:hidden bg-white px-4 pb-4 flex flex-col gap-3 border-t text-gray-700">
                    <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
                    <Link to="/search" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                        <Search className="w-5 h-5"/>
                        <span>Search</span>
                    </Link>
                    <div className="flex items-center gap-2 pt-2" onClick={() => {
                        onCartClick();
                        setMenuOpen(false);
                    }}>
                        {renderCartIcon()}
                        <span>Cart</span>
                    </div>
                    <div onClick={() => setMenuOpen(false)}>
                        {renderAuthOption()}
                    </div>
                </nav>
            )}
        </header>
    );
}
