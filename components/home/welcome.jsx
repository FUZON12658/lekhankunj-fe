import Button from "../common/button"
import Image from "next/image"

const Welcome = () => {
    return (
        <div className="bg-[#FAFAFA] h-[51rem] relative grid place-items-center overflow-hidden">
            <Image
                src="/welcome-left.png"
                alt="Welcome decoration left"
                width={700}
                height={672}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 object-contain"
            />

            <Image
                src="/welcome-right.png"
                alt="Welcome decoration right"
                width={700}
                height={672}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 object-contain"
            />

            <div className="w-[25rem] flex flex-col gap-7 items-center text-center relative">
                <p className="text-header-2 font-recoleta text-[#1A1A1A]">Welcome to Lekhan Kunja</p>
                <p className="text-body-2 text-primary-600">We're more than just a bookstore - we're a community of passionate readers, dreamers, and storytellers. Founded with the belief that every great story deserves to find its perfect reader, we curate an extraordinary collection of physical books, eBooks, and audiobooks from around the world.</p>
                <Button style="fill" size="medium" text="Read Our Story" iconRight="placeholder" color="info-green" />
            </div>
        </div>
    )
}
export default Welcome