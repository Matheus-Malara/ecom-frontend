import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"
import {getCategories} from "../services/categoryApi"
import {getBrands} from "../services/brandApi"
import type {Category} from "../types/category"
import type {Brand} from "../types/brand"

export default function ProductFilters() {
    const [params, setParams] = useSearchParams()
    const [categories, setCategories] = useState<Category[]>([])
    const [brands, setBrands] = useState<Brand[]>([])

    useEffect(() => {
        getCategories().then(setCategories)
        getBrands().then(setBrands)
    }, [])

    const updateParam = (key: string, value: string) => {
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        setParams(params)
    }

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Search by name"
                className="w-full border px-2 py-1 rounded"
                defaultValue={params.get("name") || ""}
                onBlur={(e) => updateParam("name", e.target.value)}
            />

            <select
                className="w-full border px-2 py-1 rounded"
                value={params.get("categoryId") || ""}
                onChange={(e) => updateParam("categoryId", e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <select
                className="w-full border px-2 py-1 rounded"
                value={params.get("brandId") || ""}
                onChange={(e) => updateParam("brandId", e.target.value)}
            >
                <option value="">All Brands</option>
                {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                        {b.name}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Flavor"
                className="w-full border px-2 py-1 rounded"
                defaultValue={params.get("flavor") || ""}
                onBlur={(e) => updateParam("flavor", e.target.value)}
            />

            <div className="flex gap-2">
                <input
                    type="number"
                    className="w-1/2 border px-2 py-1 rounded"
                    placeholder="Min price"
                    defaultValue={params.get("minPrice") || ""}
                    onBlur={(e) => updateParam("minPrice", e.target.value)}
                />
                <input
                    type="number"
                    className="w-1/2 border px-2 py-1 rounded"
                    placeholder="Max price"
                    defaultValue={params.get("maxPrice") || ""}
                    onBlur={(e) => updateParam("maxPrice", e.target.value)}
                />
            </div>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    defaultChecked={params.get("active") === "true"}
                    onChange={(e) => updateParam("active", e.target.checked ? "true" : "")}
                />
                Only active products
            </label>
        </div>
    )
}
