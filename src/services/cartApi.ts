import api from "./axiosInstance";
import type {Cart} from "@/types/cart";
import type {StandardResponse} from "@/types/api-response";

interface AddToCartRequest {
    productId: number;
    quantity: number;
}

export async function addToCart(data: AddToCartRequest): Promise<Cart> {
    const response = await api.post<StandardResponse<Cart>>("/cart/items", data);
    return response.data.data;
}

export async function fetchCart(): Promise<Cart> {
    const response = await api.get<StandardResponse<Cart>>("/cart");
    return response.data.data;
}

export async function updateCartItem(productId: number, quantity: number): Promise<Cart> {
    const response = await api.put<StandardResponse<Cart>>(`/cart/items/${productId}`, {quantity});
    return response.data.data;
}

export async function clearCart(): Promise<void> {
    await api.delete("/cart");
}

export async function removeFromCart(productId: number): Promise<Cart> {
    const response = await api.delete<StandardResponse<Cart>>(`/cart/items/${productId}`);
    return response.data.data;
}
