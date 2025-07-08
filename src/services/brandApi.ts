import api from "./axiosInstance";
import type {StandardResponse} from "../types/api-response";
import type {Page} from "../types/paginated";
import type {Brand} from "../types/brand";

export async function getBrands(): Promise<Brand[]> {
    const response = await api.get<StandardResponse<Page<Brand>>>("/brands", {
        params: {
            active: true,
            size: 8,
        },
    });

    return response.data.data.content;
}
