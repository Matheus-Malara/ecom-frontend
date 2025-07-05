import { Link } from "react-router-dom";
import type { Product } from "../types/product";

type Props = {
    product: Product;
};

function ProductCard({ product }: Props) {
    return (
        <Link to={`/product/${product.id}`} className="block hover:scale-[1.02] transition">
            <div className="border rounded-lg p-4 shadow-sm h-full flex flex-col items-center text-center">
                <img
                    src={product.images?.[0]?.imageUrl || "/no-image-available.png"}
                    alt={product.name}
                    className="h-32 object-contain mb-2"
                />
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-500 text-sm">{product.flavor || "N/A"}</p>
                <p className="text-green-600 font-bold text-md mt-1">${product.price.toFixed(2)}</p>
            </div>
        </Link>
    );
}

export default ProductCard;
