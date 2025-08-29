"use client";
import Image from "next/image";
import Search from "../home/search";
import Button from "./button";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CartSidebar, { CartIconTrigger } from "./cart_sidebar";

// Navigation links with multiple dropdowns
const navLinks = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact/' },
  ],
  dropdowns: [
    {
      name: 'About us',
      href: '/about/',
      items: [
        { name: 'Lekhankunja', href: '/about/' },
        { name: 'Ghostwriting', href: '/about/ghostwriting' },
        { name: 'Creative Writing Classes', href: '/about/creative-classes' },
        { name: 'Our Team', href: '/about/our-team' },
      ],
    },
    {
      name: 'Books',
      href: '/books/',
      items: [
        { name: 'Fiction', href: '/books/?category=fiction' },
        { name: 'Non-Fiction', href: '/books/?category=non-fiction' },
        { name: 'Mystery & Thriller', href: '/books/?category=mystery-thriller' },
        { name: 'Romance', href: '/books/?category=romance' },
        {
          name: 'Science Fiction & Fantasy',
          href: '/books/?category=sci-fi-fantasy',
        },
        { name: 'Biography & Memoir', href: '/books/?category=biography-memoir' },
        {
          name: 'Self-Help & Personal Development',
          href: '/books/?category=self-help',
        },
        {
          name: "Children's & Young Adult",
          href: '/books/?category=childrens-ya',
        },
        { name: 'History & Politics', href: '/books/?category=history-politics' },
        {
          name: 'Business & Economics',
          href: '/books/?category=business-economics',
        },
        { name: 'Health & Wellness', href: '/books/?category=health-wellness' },
        { name: 'Travel & Adventure', href: '/books/?category=travel-adventure' },
        { name: 'Cooking & Food', href: '/books/?category=cooking-food' },
        { name: 'Art & Design', href: '/books/?category=art-design' },
        {
          name: 'Religion & Spirituality',
          href: '/books/?category=religion-spirituality',
        },
        { name: 'Technology & Science', href: '/books/?category=tech-science' },
      ],
    },
  ],
};

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownEnter = (dropdownName) => {
    setOpenDropdown(dropdownName);
  };

  const handleDropdownLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="bg-primary-100 h-[5.625rem] grid place-items-center sticky top-0 z-[9999]">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="Logo" width={200} height={42} />
        </Link>
        
        <div className="flex justify-center gap-9">
          {/* Home link */}
          <Link
            href={navLinks.main[0].href}
            className="text-btn font-semibold uppercase"
          >
            {navLinks.main[0].name}
          </Link>

          {/* Dropdown menus */}
          {navLinks.dropdowns.map((dropdown, dropdownIndex) => (
            <div key={dropdownIndex} className="relative group">
              <Link
                href={dropdown.href}
                className="text-btn font-semibold uppercase flex items-center gap-1 hover:text-green-600 transition-colors duration-200"
                onMouseEnter={() => handleDropdownEnter(dropdown.name)}
              >
                {dropdown.name}
                <ChevronDown className="w-3 h-3" />
              </Link>

              {/* Dropdown menu */}
              <div 
                className={`absolute bg-white rounded-lg shadow-lg ${
                  dropdown.name === 'Books' ? 'w-120 -left-20' : 'w-64 -left-8'
                } top-8 opacity-0 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-300 origin-top invisible group-hover:visible`}
                onMouseEnter={() => handleDropdownEnter(dropdown.name)}
                onMouseLeave={handleDropdownLeave}
              >
                <div className="p-4">
                  <div className={`${
                    dropdown.name === 'Books' ? 'grid grid-cols-2 gap-2 max-h-96 overflow-y-auto' : 'space-y-1'
                  }`}>
                    {dropdown.items.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-green-600 rounded transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Contact link */}
          <Link
            href={navLinks.main[1].href}
            className="text-btn font-semibold uppercase"
          >
            {navLinks.main[1].name}
          </Link>
        </div>
        
        <div className="flex items-center gap-8">
          <Search />
          <CartIconTrigger className={`w-6 h-6`} />
          <Link href={`/auth/register`}><Button color="info-green" size="small" text="Login" style="fill" /></Link>
        </div>
      </div>
      
      {/* Cart Sidebar */}
      <CartSidebar />
    </header>
  );
};

export default Header;