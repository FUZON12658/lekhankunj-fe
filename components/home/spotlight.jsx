import CardSpotlight from "./cardSpotlight"
import EmblaCarousel from "./spotlight-carousel/EmblaCarousel"

const Spotlight = () => {
    const OPTIONS = { slidesToScroll: 'auto' }
    const AUTHORS_DATA = [
        {
            name: "Arundhati Khanna",
            comment: "Writing is not just about telling stories; it's about creating worlds where readers can lose themselves and find new perspectives. Every book is a bridge between minds, cultures, and experiences.",
            image: "/author-image.png"
        },
        {
            name: "Arundhati Khanxa",
            comment: "Writing is not just about telling stories; it's about creating worlds where readers can lose themselves and find new perspectives. Every book is a bridge between minds, cultures, and experiences.",
            image: "/author-image.png"
        },
        {
            name: "Arundhati Khandaina",
            comment: "Writing is not just about telling stories; it's about creating worlds where readers can lose themselves and find new perspectives. Every book is a bridge between minds, cultures, and experiences.",
            image: "/author-image.png"
        },
        {
            name: "Arundhati Khairaxa",
            comment: "Writing is not just about telling stories; it's about creating worlds where readers can lose themselves and find new perspectives. Every book is a bridge between minds, cultures, and experiences.",
            image: "/author-image.png"
        },
        {
            name: "Arundhati Khadaixa",
            comment: "Writing is not just about telling stories; it's about creating worlds where readers can lose themselves and find new perspectives. Every book is a bridge between minds, cultures, and experiences.",
            image: "/author-image.png"
        },
        {
            name: "Arundhati Lekhai",
            comment: "Writing is not just about telling stories; it's about creating worlds where readers can lose themselves and find new perspectives. Every book is a bridge between minds, cultures, and experiences.",
            image: "/author-image.png"
        },

    ]
    const SLIDES = AUTHORS_DATA.map((author) => (
        <CardSpotlight
            key={author.name}
            name={author.name}
            comment={author.comment}
            image={author.image}
        />
    ))

    return (
        <div className="bg-[#FFE8CB]">
            <div className="container flex flex-col items-center gap-14 py-24">
                <h2 className="text-header-2 font-recoleta">Author Spotlight</h2>
                <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
        </div>
    )
}
export default Spotlight