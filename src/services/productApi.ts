import type {Product} from "../types/product"
import type {StandardResponse, ApiPage} from "../types/api-response"

export async function getFeaturedProducts(): Promise<Product[]> {
    const res = await fetch("http://localhost:8080/api/products?page=0&size=6")
    if (!res.ok) throw new Error("Failed to fetch products")

    const json: StandardResponse<ApiPage<Product>> = await res.json()
    return json.data.content.filter(p => p.active)
}
