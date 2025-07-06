import axios from "axios";
import type {Cart} from "@/types/cart";
import type {StandardResponse} from "@/types/api-response";

interface AddToCartRequest {
    productId: number;
    quantity: number;
}

export async function addToCart(data: AddToCartRequest): Promise<Cart> {
    const response = await axios.post<StandardResponse<Cart>>("/api/cart/items", data, {
        headers: {
            "X-Anonymous-Id": getAnonymousId(),
        },
    });
    return response.data.data;
}

export async function fetchCart(): Promise<Cart> {
    const response = await axios.get<StandardResponse<Cart>>("/api/cart", {
        headers: {
            "X-Anonymous-Id": getAnonymousId(),
        },
    });
    return response.data.data;
}

export async function removeFromCart(productId: number): Promise<Cart> {
    const response = await axios.delete<StandardResponse<Cart>>(`/api/cart/items/${productId}`, {
        headers: {
            "X-Anonymous-Id": getAnonymousId(),
        },
    });
    return response.data.data;
}

function getAnonymousId(): string {
    let anonId = localStorage.getItem("anonymousId");
    if (!anonId) {
        anonId = crypto.randomUUID();
        localStorage.setItem("anonymousId", anonId);
    }
    return anonId;
}
