export interface ProductImage {
    id: number
    imageUrl: string
    displayOrder: number
}

export interface Product {
    id: number
    name: string
    description: string
    categoryName: string
    brandName: string
    price: number
    stock: number
    weightGrams: number
    flavor: string
    images: ProductImage[]
    active: boolean
}
