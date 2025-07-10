import type {Order} from "@/types/order";
import type {StandardResponse} from "@/types/api-response.ts";
import api from "@/services/axiosInstance.ts";
import type {Page} from "@/types/paginated.ts";

export async function createOrder(): Promise<Order> {
    const response = await api.post<StandardResponse<Order>>("/orders/checkout");
    return response.data.data;
}

export async function getOrderById(id: number): Promise<Order> {
    const response = await api.get<StandardResponse<Order>>(`/orders/${id}`);
    return response.data.data;
}

export async function getUserOrders(page: number = 0, size: number = 10): Promise<StandardResponse<Page<Order>>> {
    const response = await api.get<StandardResponse<Page<Order>>>(`/orders?page=${page}&size=${size}`);
    return response.data;
}
