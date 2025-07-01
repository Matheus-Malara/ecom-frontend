import HeroBanner from "../components/HeroBanner"
import CategoryGrid from "../components/CategoryGrid"
import FeaturedProducts from "../components/FeaturedProducts"
import BenefitsSection from "../components/BenefitsSection"
import Testimonials from "../components/Testimonials"

export default function Home() {
    return (
        <main className="flex flex-col gap-16 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto py-8">
            <HeroBanner />

            <section id="categories">
                <CategoryGrid />
            </section>

            <section id="highlights">
                <FeaturedProducts />
            </section>

            <section id="benefits">
                <BenefitsSection />
            </section>

            <section id="testimonials">
                <Testimonials />
            </section>
        </main>
    )
}
