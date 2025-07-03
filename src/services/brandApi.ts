import axios from "axios"
import type {StandardResponse} from "../types/api-response"
import type {Page} from "../types/paginated"
import type {Brand} from "../types/brand"

export async function getBrands(): Promise<Brand[]> {
    const response = await axios.get<StandardResponse<Page<Brand>>>("/api/brands", {
        params: {
            active: true,
            size: 8,
        },
    })

    return response.data.data.content
}
