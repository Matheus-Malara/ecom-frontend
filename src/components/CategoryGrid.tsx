import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {getCategories} from "../services/categoryApi";
import type {Category} from "../types/category";
import {useNavigate} from "react-router-dom";

export default function CategoryGrid() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getCategories()
            .then((data) => {
                setCategories(data);
                setError(false);
            })
            .catch((err) => {
                console.error("❌ Failed to fetch categories", err);
                setError(true);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className="text-center py-10">Loading categories...</p>;
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-600 font-semibold">
                ⚠️ Failed to load categories. Please try again later.
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No categories found.
            </div>
        );
    }

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat, index) => (
                    <motion.div
                        key={cat.id}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: index * 0.1}}
                        className="bg-white p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer"
                        onClick={() => navigate(`/search?categoryId=${cat.id}`)}
                    >
                        <img
                            src={cat.imageUrl}
                            alt={cat.name}
                            className="h-24 mx-auto mb-2 object-contain"
                        />
                        <p className="text-center font-medium">{cat.name}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
