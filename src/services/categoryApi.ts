import type {Category} from "../types/category"
import type {ApiPage, StandardResponse} from "../types/api-response"

export async function getCategories(): Promise<Category[]> {
    const res = await fetch("http://localhost:8081/api/categories?page=0&size=8") // ajuste se necessário
    if (!res.ok) throw new Error("Failed to fetch categories")

    const json: StandardResponse<ApiPage<Category>> = await res.json()
    return json.data.content.filter(cat => cat.active)
}
