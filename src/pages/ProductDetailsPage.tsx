import {useParams} from "react-router-dom";
import {useEffect, useState, useContext} from "react";
import type {Product} from "../types/product";
import {getProductById} from "../services/productApi";
import Loading from "../components/Loading";
import {addToCart} from "../services/cartApi";
import {toast} from "react-toastify";
import {CartContext} from "@/features/cart/CartContext";

function ProductDetailsPage() {
    const {id} = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        if (id) {
            getProductById(Number(id))
                .then((data) => {
                    setProduct(data);
                    setMainImage(data.images?.[0]?.imageUrl || "/no-image-available.png");
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    const {setCart} = useContext(CartContext);

    const handleAddToCart = async () => {
        if (!product) return;
        setAdding(true);
        try {
            const updatedCart = await addToCart({productId: product.id, quantity: 1});
            setCart(updatedCart);
            toast.success("Product added to cart!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to add product to cart.");
        } finally {
            setAdding(false);
        }
    };

    if (loading) return <Loading/>;

    if (!product) {
        return <p className="text-center text-red-500 mt-10">Product not found.</p>;
    }

    if (!product.active) {
        return (
            <p className="text-center text-yellow-600 mt-10 text-lg font-medium">
                This product is currently inactive or out of stock.
            </p>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-10">
                {/* Image gallery */}
                <div className="flex-1">
                    <div
                        className="bg-white border rounded-lg overflow-hidden p-2 aspect-square flex items-center justify-center">
                        <img
                            src={mainImage || "/no-image-available.png"}
                            alt={product.name}
                            className="max-h-[500px] max-w-full object-contain"
                        />
                    </div>

                    <div className="flex gap-3 overflow-x-auto mt-2">
                        {product.images.map((img) => (
                            <img
                                key={img.id}
                                src={img.imageUrl}
                                alt="Thumbnail"
                                onClick={() => setMainImage(img.imageUrl)}
                                className={`w-16 h-16 object-contain rounded border cursor-pointer transition-transform duration-200 hover:scale-105 ${
                                    mainImage === img.imageUrl ? "ring-2 ring-green-600" : ""
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Product details */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-gray-500 mb-1">Brand: {product.brandName}</p>
                    <p className="text-gray-500 mb-1">Flavor: {product.flavor || "N/A"}</p>
                    <p className="text-gray-500 mb-1">Category: {product.categoryName}</p>
                    <p className="text-gray-500 mb-1">Weight: {product.weightGrams}g</p>
                    <p className="text-gray-500 mb-4">Stock: {product.stock}</p>

                    <p className="text-2xl font-semibold text-green-600 mb-4">
                        ${product.price.toFixed(2)}
                    </p>

                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0 || adding}
                        className={`bg-green-600 text-white px-6 py-2 rounded-md font-semibold transition ${
                            product.stock === 0 || adding ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                        }`}
                    >
                        {adding ? "Adding..." : "Add to cart"}
                    </button>

                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed mt-6">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsPage;
