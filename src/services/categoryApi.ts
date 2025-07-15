import axios from "axios"
import type {Category} from "../types/category"
import type {StandardResponse} from "../types/api-response"
import type {Page} from "../types/paginated"

export async function getCategories(): Promise<Category[]> {
    const response = await axios.get<StandardResponse<Page<Category>>>("/api/categories", {
        params: {
            active: true,
            size: 8,
        },
    })

    return response.data.data.content
}
