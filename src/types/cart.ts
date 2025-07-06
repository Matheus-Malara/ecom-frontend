export interface CartItem {
    productId: number;
    productName: string;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
    imageUrl: string;
}

export interface Cart {
    cartId: number;
    items: CartItem[];
    totalItems: number;
    totalAmount: number;
}