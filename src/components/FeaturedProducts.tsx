import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type {Product} from "../types/product"
import type {StandardResponse, ApiPage} from "../types/api-response"

export default function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:8081/api/products?page=0&size=6")
            .then(res => res.json())
            .then((json: StandardResponse<ApiPage<Product>>) => {
                const content = json.data.content
                setProducts(content.filter(p => p.active))
            })
            .catch(err => {
                console.error("Failed to fetch products", err)
            })
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <p className="text-center py-10">Loading products...</p>
    }

    return (
        <section>
            <h2 className="text-2xl font-bold mb-6">This Week's Highlights</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product, index) => {
                    const imageUrl = product.images[0]?.imageUrl
                    return (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="bg-white p-4 rounded-xl shadow hover:scale-105 transition"
                        >
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="h-32 mx-auto mb-4 object-contain"
                                />
                            )}
                            <h3 className="text-center font-semibold">{product.name}</h3>
                            <p className="text-center text-yellow-600 font-bold">
                                R$ {product.price.toFixed(2)}
                            </p>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    )
}
