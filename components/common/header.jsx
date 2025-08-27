import Image from "next/image";
import Search from "../home/search";
import Button from "./button";
import Link from "next/link";

const Header = () => {
  const navbarItems = ["shop", "about", "community", "discover"];
  const placeholderIcon = (
    <Image src="/placeholder.png" alt="Icon" width={20} height={20} />
  );

  return (
    <header className="bg-primary-100 h-[5.625rem] grid place-items-center sticky top-0 z-50">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={200} height={42} />
        </Link>
        <div className="flex justify-center gap-9">
          {navbarItems.map((item, index) => (
            <Link
              key={index}
              href={`/${item}`}
              className="text-btn font-semibold uppercase"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-8">
          <Search />
          {placeholderIcon}
          <Button color="info-green" size="small" text="Login" style="fill" />
        </div>
      </div>
    </header>
  );
};
export default Header;
