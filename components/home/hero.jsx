import Image from "next/image";
import Button from "../common/button"
import EmblaCarousel from "./hero-carousel/EmblaCarousel";

const OPTIONS = { containScroll: false, align: 'start' }
const IMAGE_SOURCES = [
    "/carousel-item.jpg",
    "/carousel-item.jpg",
    "/carousel-item.jpg",
    "/carousel-item.jpg",
    "/carousel-item.jpg"
]
const SLIDES = IMAGE_SOURCES.map((src, index) => (
    <Image
        key={index}
        src={src}
        alt={`Book ${index + 1}`}
        width={300}
        height={400}
        className="w-full h-full object-cover rounded-lg"
    />
))

const Hero = () => {

    return (
        <div className="container flex items-center justify-center gap-24 py-10">
            <div className="flex flex-col gap-6">
                <p className="text-hero font-recoleta">Your Literary Universe Awaits</p>
                <p className="text-body-2 text-primary-600">Discover, read, and connect with the world's most captivating stories. From physical books to digital adventures, your perfect read is just a click away.</p>
                <div className="flex gap-6">
                    <Button style="fill" color="info-green" size="medium" iconRight="placeholder" text="Explore Books" />
                </div>
            </div>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
    )
}
export default Hero