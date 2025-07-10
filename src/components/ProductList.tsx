import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import {getFilteredProducts} from "../services/productApi"
import type {Product} from "../types/product"
import type {ProductFilter} from "../types/product-filter"
import type {Page} from "../types/paginated"
import ProductCard from "@/pages/ProductCard.tsx";

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
                {pageData.content.map((p) => (
                    <ProductCard key={p.id} product={p}/>
                ))}

            </div>

            {pageData.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({length: pageData.totalPages}).map((_, i) => (
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