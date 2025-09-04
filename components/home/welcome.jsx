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
                className="absolute left-0 top-1/2 w-[32vw] transform -translate-y-1/2 object-contain"
            />

            <Image
                src="/welcome-right.png"
                alt="Welcome decoration right"
                width={700}
                height={672}
                className="absolute right-0 top-1/2 w-[32vw] transform -translate-y-1/2 object-contain"
            />

            <div className="w-[33vw] flex flex-col gap-7 items-center text-center relative">
                <p className="text-header-2 font-recoleta text-[#1A1A1A] text-balance">Welcome to <span className="text-info-green-600">Lekhan Kunja</span></p>
                <p className="text-body-2 text-primary-600">At Lekhan Kunja, we’re more than just a hub for books — we’re a creative community of writers, readers, and storytellers. Founded with the vision of nurturing voices and ideas, we offer ghostwriting, publishing support, creative writing, theatre, music and art class and a curated collection of books, eBooks, and audiobooks. Here, imagination meets expression, and every story finds the space to grow and connect with its audience.</p>
                <Button style="fill" size="medium" text="Read Our Story" iconRight="placeholder" color="info-green" />
            </div>
        </div>
    )
}
export default Welcome