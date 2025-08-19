import Image from "next/image"
import Search from "./search"
import Button from "../common/button";

const Header = () => {
  const navbarItems = ["shop", "about", "community", "discover"]
  const placeholderIcon = <Image src="/placeholder.png" alt="Icon" width={20} height={20} />;

  return (
    <header className="bg-primary-100 h-[90px] grid place-items-center">
      <div className="container flex justify-between items-center">
        <Image src="/logo.png" alt="Logo" width={200} height={42} />
        <div className="flex justify-center gap-9">
          {navbarItems.map((item, index) => (
            <a key={index} href={`/${item}`} className="text-btn font-semibold uppercase">
              {item}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-8">
          <Search />
          {placeholderIcon}
          <Button color="info-green" size="small" text="Login" style="fill" />
        </div>
      </div>
    </header>
  )
}
export default Header