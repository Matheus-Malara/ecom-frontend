import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-yellow-500">
                    MEGA SUPPS
                </Link>

                <nav className="hidden md:flex gap-6 items-center font-medium text-gray-700">
                    <a href="/">Home</a>
                    <a href="#highlights">Highlights</a>
                    <a href="#categories">Categories</a>
                    <a href="#benefits">Benefits</a>
                    <a href="#testimonials">Testimonials</a>
                    <Link to="/search" className="flex items-center gap-1 hover:text-yellow-600">
                        <Search className="w-5 h-5" />
                        Search
                    </Link>
                    <ShoppingCart className="w-6 h-6 cursor-pointer" />
                </nav>

                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {menuOpen && (
                <nav className="md:hidden bg-white px-4 pb-4 flex flex-col gap-3 border-t text-gray-700">
                    <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
                    <a href="#highlights" onClick={() => setMenuOpen(false)}>Highlights</a>
                    <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
                    <a href="#benefits" onClick={() => setMenuOpen(false)}>Benefits</a>
                    <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                    <Link to="/search" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        <span>Search</span>
                    </Link>
                    <div className="flex items-center gap-2 pt-2">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Cart</span>
                    </div>
                </nav>
            )}
        </header>
    )
}
