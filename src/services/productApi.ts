import axios from "axios"
import type {StandardResponse} from "../types/api-response"
import type {Page} from "../types/paginated"
import type {Product} from "../types/product"
import type {ProductFilter} from "../types/product-filter"


export async function getFeaturedProducts(): Promise<Product[]> {
    const response = await axios.get<StandardResponse<Page<Product>>>("/api/products", {
        params: {
            active: true,
            size: 8,
        },
    })

    return response.data.data.content
}

export async function getFilteredProducts(
    filters: ProductFilter,
    page = 0,
    size = 8
): Promise<Page<Product>> {
    const response = await axios.get<StandardResponse<Page<Product>>>("/api/products", {
        params: {
            ...filters,
            page,
            size,
        },
    })
    return response.data.data
}

export async function getProductById(id: number): Promise<Product> {
    const res = await fetch(`/api/products/${id}`);
    const data: StandardResponse<Product> = await res.json();
    return data.data;
}