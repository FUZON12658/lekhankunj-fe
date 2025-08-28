"use client"
import Image from "next/image"
import Button from "../common/button"

const ReleaseCard = ({ author, title, publishedDate, publisher, categories, image, link }) => {
    return (
        <div className="bg-white w-[43.5rem] h-[38rem] p-20 flex flex-col items-start justify-between relative flex-shrink-0">
            <div className="w-[26rem]">
                <p className="text-subtitle-4 font-semibold! text-primary-500 py-4">{author}</p>
                <h3 className="text-header-2 font-recoleta text-primary-700">{title}</h3>
                <hr className="border-t-2 border-primary-200 my-8" />

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <p className="text-subtitle-4 font-semibold! text-primary-500">Originally Published</p>
                        <p className="text-subtitle-2 text-primary-700 pt-2">{publishedDate}</p>
                    </div>
                    <div>
                        <p className="text-subtitle-4 font-semibold! text-primary-500">Publisher</p>
                        <p className="text-subtitle-2 text-primary-700 pt-2">{publisher}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-subtitle-4 font-semibold! text-primary-500">Categories</p>
                        <p className="text-subtitle-2 text-primary-700 pt-2">{categories.join(", ")}</p>
                    </div>
                </div>
            </div>
            <Image src={image} alt={title} width={320} height={460} className="absolute top-1/2 -right-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[29rem] object-cover" />
            <Button href={link} size="medium" style="fill" text="Get Book" iconRight="placeholder" color="info-green" />
        </div>
    )
}

const Latest = () => {
    const metadata = {
        author: "H.G. Wells",
        title: "The Island of Doctor Moreau",
        publishedDate: "July 11, 2025",
        publisher: "English Classics",
        categories: ["Fictional", "Magical Realism", "Asian Literature", "Domestic Fiction"],
        image: "/book.jpg",
        link: "/product/1",
        quote: "A, euismod risus mi eget massa at justo sem. Sed eu id suscipit sociis. Nec nisl viverra a eget pellentesque quam ornare vitae facilisi.",
        quoteAuthor: "Chicago Tribune",
    }

    return (
        <div className="bg-primary-700">
            <div className="container py-24">
                <h2 className="text-header-2 font-recoleta text-white pb-16">Latest Release</h2>
                <div className="flex justify-start items-center">
                    <ReleaseCard {...metadata} />
                    <div className="w-[25rem] text-body-2 text-primary-300 ml-56 flex-shrink-0 relative">
                        <p>{metadata.quote}</p>
                        <hr className="border-2 border-primary-600 rounded-md w-24 my-6" />
                        <p>{metadata.quoteAuthor}</p>
                        <p className="text-hero text-primary-600 text-8xl! absolute font-recoleta translate-y-1/2 -top-1/2 right-0 -rotate-180 -rotate-x-180">“</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Latest