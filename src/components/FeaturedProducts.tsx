import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {getFeaturedProducts} from "../services/productApi";
import type {Product} from "../types/product";
import ProductCard from "../pages/ProductCard";

export default function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getFeaturedProducts()
            .then((data) => {
                setProducts(data);
                setError(false);
            })
            .catch((err) => {
                console.error("❌ Failed to fetch products", err);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className="text-center py-10">Loading products...</p>;
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-600 font-semibold">
                ⚠️ Failed to load products. Please try again later.
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No featured products found.
            </div>
        );
    }

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: index * 0.1}}
                    >
                        <ProductCard product={product}/>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
