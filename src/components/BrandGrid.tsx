import {useEffect, useState} from "react"
import {motion} from "framer-motion"
import {getBrands} from "../services/brandApi"
import type {Brand} from "../types/brand"

export default function BrandGrid() {
    const [brands, setBrands] = useState<Brand[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        getBrands()
            .then((data) => {
                setBrands(data)
                setError(false)
            })
            .catch((err) => {
                console.error("❌ Failed to fetch brands", err)
                setError(true)
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <p className="text-center py-10">Loading brands...</p>
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-600 font-semibold">
                ⚠️ Failed to load brands. Please try again later.
            </div>
        )
    }

    if (brands.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No brands found.
            </div>
        )
    }

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">Popular Brands</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {brands.map((brand, index) => (
                    <motion.div
                        key={brand.id}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{delay: index * 0.1}}
                        className="bg-white p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer"
                    >
                        <img
                            src={brand.logoUrl}
                            alt={brand.name}
                            className="h-16 w-32 mx-auto mb-2 object-contain"
                        />
                        <p className="text-center font-medium">{brand.name}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
