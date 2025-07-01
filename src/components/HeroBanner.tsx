export default function HeroBanner() {
    return (
        <section className="relative bg-gray-900 text-white rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 sm:p-12 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Fuel Your Performance with Premium Supplements
                </h1>
                <p className="text-lg text-gray-300 mb-6">
                    Discover our curated selection of top-quality products to support muscle growth, energy, and recovery.
                </p>
                <a
                    href="#highlights"
                    className="inline-block bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl hover:bg-yellow-500 transition"
                >
                    Shop Now
                </a>
            </div>
        </section>
    )
}
