import { motion } from "framer-motion"

const testimonials = [
    {
        name: "John M.",
        message: "Best supplement store I've ever ordered from. Super fast delivery!",
    },
    {
        name: "Rachel L.",
        message: "Top quality products and great customer service. Highly recommend!",
    },
    {
        name: "Carlos P.",
        message: "MEGA SUPPS has everything I need for my training routine!",
    },
]

export default function Testimonials() {
    return (
        <section className="bg-yellow-50 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {testimonials.map((t, index) => (
                    <motion.div
                        key={t.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-white p-4 rounded-xl shadow"
                    >
                        <p className="text-gray-700 italic">"{t.message}"</p>
                        <p className="text-right mt-4 font-semibold text-sm">– {t.name}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
