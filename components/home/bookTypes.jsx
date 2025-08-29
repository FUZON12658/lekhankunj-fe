import { BookIcon } from "lucide-react";
import Image from "next/image";
import { AudioBookIcon, EbookIcon } from "../common/icons";

const BookTypes = ({ type }) => {
    const metadata =
        type === "physical" ?
            { title: "Physical Book", subtitle: "Fastest Shipping", icon: <BookIcon className="w-10 h-10 text-white"/>, background: "bg-[#418295]" } :
            type === "ebook" ?
                { title: "eBooks", subtitle: "Instant Access", icon: <EbookIcon  className={`w-10 h-10`} />, background: "bg-[#41957F]" } :
                type === "audiobook" ?
                    { title: "Audiobook", subtitle: "From Best Narrators", icon: <AudioBookIcon className={`w-10 h-10`} />, background: "bg-[#4A4195]" } : null;

    return (
        <div className="bg-[#F8F8F8] rounded-2xl flex items-center gap-4 px-5 py-4 min-w-2xs">
            <div className={`w-16 h-16 grid place-items-center rounded-full ${metadata.background}`}>
                {metadata.icon }
            </div>
            <div>
                <h3 className="text-subtitle-1 text-primary-700 pb-1">{metadata.title}</h3>
                <p className="text-body-2 pt-1 text-primary-500">{metadata.subtitle}</p>
            </div>
        </div>
    )
}
export default BookTypes