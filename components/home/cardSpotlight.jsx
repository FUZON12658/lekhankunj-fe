import Image from "next/image"

const CardSpotlight = ({ name, comment, image }) => {
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex max-w-[20rem] flex-col gap-6 text-center">
                <h3 className="text-subtitle-1 text-primary-700">{name}</h3>
                <p className="text-body-3 text-primary-600">"{comment}"</p>
            </div>
            <Image src={image} alt={name} width={72} height={72} className="rounded-full" />
        </div>
    )
}
export default CardSpotlight