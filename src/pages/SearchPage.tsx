import ProductFilters from "../components/ProductFilters"
import ProductList from "../components/ProductList"

export default function SearchPage() {
    return (
        <main className="flex flex-col md:flex-row gap-8 p-4 max-w-7xl mx-auto">
            <aside className="w-full md:w-1/4">
                <ProductFilters />
            </aside>
            <section className="flex-1">
                <ProductList />
            </section>
        </main>
    )
}
