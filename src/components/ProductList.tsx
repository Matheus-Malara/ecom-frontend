import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getFilteredProducts } from "../services/productApi"
import type {Product} from "../types/product"
import type { ProductFilter } from "../types/product-filter"
import type { Page } from "../types/paginated"

export default function ProductList() {
    const [params, setParams] = useSearchParams()
    const [pageData, setPageData] = useState<Page<Product>>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const page = Number(params.get("page") || "0")

    const filter: ProductFilter = {
        name: params.get("name") || undefined,
        categoryId: params.get("categoryId") ? Number(params.get("categoryId")) : undefined,
        brandId: params.get("brandId") ? Number(params.get("brandId")) : undefined,
        flavor: params.get("flavor") || undefined,
        active: params.get("active") === "true" ? true : undefined,
        minPrice: params.get("minPrice") ? Number(params.get("minPrice")) : undefined,
        maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : undefined,
    }

    useEffect(() => {
        setLoading(true)
        getFilteredProducts(filter, page)
            .then(setPageData)
            .catch((err) => {
                console.error("❌ Failed to fetch products", err)
                setError(true)
            })
            .finally(() => setLoading(false))
    }, [params.toString()])

    const handlePageChange = (newPage: number) => {
        params.set("page", String(newPage))
        setParams(params)
    }

    if (loading) return <p className="py-10 text-center">Loading...</p>
    if (error) return <p className="py-10 text-center text-red-500">Error loading products.</p>
    if (!pageData || pageData.content.length === 0)
        return <p className="py-10 text-center text-gray-500">No products found.</p>

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pageData.content.map((p) => {
                    const mainImage =
                        p.images && p.images.length > 0
                            ? p.images.sort((a, b) => a.displayOrder - b.displayOrder)[0].imageUrl
                            : "/no-image-available.png"

                    return (
                        <div
                            key={p.id}
                            className="bg-white p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer"
                        >
                            <img
                                src={mainImage}
                                alt={p.name}
                                className="h-24 mx-auto mb-2 object-contain"
                            />
                            <p className="text-center font-medium">{p.name}</p>
                            <p className="text-center text-sm text-gray-500">{p.flavor}</p>
                            <p className="text-center text-green-600 font-bold mt-1">
                                R$ {p.price.toFixed(2)}
                            </p>
                        </div>
                    )
                })}
            </div>

            {pageData.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: pageData.totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i)}
                            className={`px-3 py-1 rounded ${
                                i === page ? "bg-blue-600 text-white" : "bg-gray-200"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </>
    )
}
