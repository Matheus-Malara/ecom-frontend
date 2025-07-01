import { motion } from "framer-motion"
import { Bolt, ShieldCheck, Truck } from "lucide-react"

const benefits = [
    {
        icon: <Truck className="w-6 h-6 text-yellow-500" />,
        title: "Fast Shipping",
        description: "Get your products in as little as 2 business days.",
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-yellow-500" />,
        title: "Guaranteed Quality",
        description: "We work only with trusted, top-tier brands.",
    },
    {
        icon: <Bolt className="w-6 h-6 text-yellow-500" />,
        title: "Maximum Performance",
        description: "Supplements designed to help you reach your goals.",
    },
]

export default function BenefitsSection() {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Why Shop With MEGA SUPPS?</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {benefits.map((b, i) => (
                    <motion.div
                        key={b.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 }}
                        className="bg-gray-100 p-6 rounded-xl shadow flex flex-col items-start gap-3"
                    >
                        {b.icon}
                        <h3 className="font-bold text-lg">{b.title}</h3>
                        <p className="text-sm text-gray-600">{b.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
