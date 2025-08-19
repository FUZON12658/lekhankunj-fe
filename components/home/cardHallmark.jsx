import Image from "next/image";

const CardHallmark = ({ type }) => {
    const metadata =
        type === "delivery" ?
            { title: "Lightning Fast Delivery", description: "Get your physical books delivered in 24-48 hours. Digital content available instantly.", icon: "/delivery.png" } :
            type === "collection" ?
                { title: "Curated Collection", description: "Explore our handpicked collection of books across genres.", icon: "/collection.png" } :
                type === "prices" ?
                    { title: "Best Prices Guaranteed", description: "Competitive pricing with exclusive discounts for community members.", icon: "/prices.png" } : null;

    return (
        <div className="w-[246px] p-4 bg-[#E4F4FB] rounded-2xl">
            <Image
                src={metadata.icon}
                alt={metadata.title}
                width={100}
                height={100}
            />
            <div className="pt-9">
                <h2 className="text-subtitle-1 text-primary-700">{metadata.title}</h2>
                <p className="text-body-3 text-primary-600 pt-3">{metadata.description}</p>
            </div>
        </div>
    )
}
export default CardHallmark