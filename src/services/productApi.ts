import api from "./axiosInstance";
import type {StandardResponse} from "../types/api-response";
import type {Page} from "../types/paginated";
import type {Product} from "../types/product";
import type {ProductFilter} from "../types/product-filter";

export async function getFeaturedProducts(): Promise<Product[]> {
    const response = await api.get<StandardResponse<Page<Product>>>("/products", {
        params: {
            active: true,
            size: 8,
        },
    });

    return response.data.data.content;
}

export async function getFilteredProducts(
    filters: ProductFilter,
    page = 0,
    size = 8
): Promise<Page<Product>> {
    const response = await api.get<StandardResponse<Page<Product>>>("/products", {
        params: {
            ...filters,
            page,
            size,
        },
    });
    return response.data.data;
}

export async function getProductById(id: number): Promise<Product> {
    const response = await api.get<StandardResponse<Product>>(`/products/${id}`);
    return response.data.data;
}
