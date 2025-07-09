import type {Order} from "@/types/order";
import type {StandardResponse} from "@/types/api-response.ts";
import api from "@/services/axiosInstance.ts";

export async function createOrder(): Promise<Order> {
    const response = await api.post<StandardResponse<Order>>("/orders/checkout");
    return response.data.data;
}

export async function getOrderById(id: number): Promise<Order> {
    const response = await api.get<StandardResponse<Order>>(`/orders/${id}`);
    return response.data.data;
}