import { motion } from "framer-motion"

const categories = [
    { name: "Proteins", image: "/categories/protein.png" },
    { name: "Pre-Workouts", image: "/categories/preworkout.png" },
    { name: "Vitamins", image: "/categories/vitamins.png" },
    { name: "Creatine", image: "/categories/creatine.png" },
]

export default function CategoryGrid() {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {categories.map((cat, index) => (
                    <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer"
                    >
                        <img src={cat.image} alt={cat.name} className="h-24 mx-auto mb-2" />
                        <p className="text-center font-medium">{cat.name}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
