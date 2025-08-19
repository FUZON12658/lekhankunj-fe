import Image from "next/image"
import Button from "../common/button"
import Tag from "../common/tag";

const Footer = () => {
    const metadata = [
        { linkType: "About Bookstore", links: [{ title: "Explore", url: "/" }, { title: "Jobs", url: "/", tag: "new!" }, { title: "About Us", url: "/" }, { title: "Contact Us", url: "/" }] },
        { linkType: "Others", links: [{ title: "Privacy Policy", url: "/" }, { title: "Terms of Service", url: "/" }, { title: "Help Center", url: "/" }] }
    ]

    const socialMediaLinks = [{ icon: <Image src="/placeholder.png" alt="Facebook" width={24} height={24} />, url: "https://www.facebook.com" }, { icon: <Image src="/placeholder.png" alt="Twitter" width={24} height={24} />, url: "https://www.twitter.com" }, { icon: <Image src="/placeholder.png" alt="Instagram" width={24} height={24} />, url: "https://www.instagram.com" }, { icon: <Image src="/placeholder.png" alt="LinkedIn" width={24} height={24} />, url: "https://www.linkedin.com" }, { icon: <Image src="/placeholder.png" alt="Twitter" width={24} height={24} />, url: "https://www.x.com" }];

    return (
        <div className="bg-[#FFF6EC] grid place-items-center">
            <div className="container py-10">
                <div className="flex items-start justify-between">
                    <div className="max-w-md flex flex-col gap-6">
                        <Image src="/logo.png" alt="Logo" width={200} height={42} />
                        <p className="text-body-2 text-primary-600">The largest, most complete and trusted online bookstore in the world. With us, you can shop online & help save your high street at the same time</p>
                        <div className="flex gap-4">
                            <Button text="Google Play" style="fill" color="primary" size="medium" iconLeft="placeholder" />
                            <Button text="App Store" style="line" color="primary" size="medium" iconLeft="placeholder" />
                        </div>
                    </div>
                    <div className="flex gap-58">
                        {metadata.map((item) => (
                            <div className="" key={item.linkType}>
                                <h4 className="text-subtitle-2 pb-6">{item.linkType}</h4>
                                <ul className="flex flex-col gap-6">
                                    {item.links.map((link) => (
                                        <li key={link.title}>
                                            <a href={link.url} className="text-primary-600 hover:underline relative">
                                                {link.title}  {link.tag && <div className="absolute top-0 left-12"><Tag tag={link.tag} color="var(--terser-700)" /></div>}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between py-6">
                    <p className="text-body-3 text-primary-400">Copyright © 2022 Bookstore. All rights reserved</p>
                    <div className="flex items-center gap-8">
                        {socialMediaLinks.map((social, index) => (
                            <a key={index} href={social.url}>
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Footer