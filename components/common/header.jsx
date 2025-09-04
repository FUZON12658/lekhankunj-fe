"use client";
import Image from "next/image";
import Search from "../home/search";
import Button from "./button";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, BookOpen, Tag, Star, ArrowRight } from "lucide-react";
import CartSidebar, { CartIconTrigger } from "./cart_sidebar";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllGenre } from "@/api/books";

// Static navigation links
const staticNavLinks = {
  main: [
    { name: "Home", href: "/" },
    // { name: "Contact", href: "/contact/" },
  ],
  about: {
    name: "About us",
    href: "/about/",
    items: [
      { name: "Lekhankunja", href: "/about/" },
      { name: "Ghostwriting", href: "/about/ghostwriting" },
      { name: "Creative Writing Classes", href: "/about/creative-classes" },
      { name: "Our Team", href: "/about/our-team" },
    ],
  },
};

const MegaMenu = ({ categories, genres, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 top-full bg-white shadow-xl border border-gray-200 z-50 rounded-b-lg"
      style={{ width: "800px" }}
      onMouseLeave={onClose}
    >
      <div className="px-6 py-5">
        <div className="grid grid-cols-12 gap-6">
          {/* Categories Section */}
          <div className="col-span-8">
            <h3 className="text-base font-semibold text-gray-900 mb-4 font-recoleta">
              Browse by Category
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {categories?.slice(0, 8).map((category) => (
                <Link
                  key={category.id}
                  href={`/books/?category=${category.slug}`}
                  className="group p-3 rounded-md border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all duration-200"
                >
                  <h4 className="font-medium text-gray-900 group-hover:text-green-700 transition-colors duration-200 text-sm">
                    {category.name}
                  </h4>
                  {category.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {category.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>

            {/* View All Categories Link */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <Link
                href="/books/"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200"
              >
                <span>View All Books</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Genres Section - Compact Sidebar */}
          <div className="col-span-4">
            <h3 className="text-base font-semibold text-gray-900 mb-4 font-recoleta">
              Popular Genres
            </h3>

            <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar">
              {genres?.slice(0, 12).map((genre) => (
                <Link
                  key={genre.id}
                  href={`/books/?genre=${genre.slug}`}
                  className="block px-3 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 group"
                >
                  <span className="font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-200 text-sm">
                    {genre.name}
                  </span>
                </Link>
              ))}
            </div>

            {genres && genres.length > 12 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <Link
                  href="/books/"
                  className="text-blue-600 hover:text-blue-700 font-medium text-xs transition-colors duration-200"
                >
                  View All Genres
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  // Fetch categories and genres
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 300000, // 5 minutes
    gcTime: 600000, // 10 minutes
  });

  const {
    data: genres,
    isLoading: genresLoading,
    isError: genresError,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: getAllGenre,
    staleTime: 300000, // 5 minutes
    gcTime: 600000, // 10 minutes
  });

  const handleDropdownEnter = (dropdownName) => {
    setOpenDropdown(dropdownName);
  };

  const handleDropdownLeave = () => {
    setOpenDropdown(null);
  };

  const isLoading = categoriesLoading || genresLoading;
  const hasError = categoriesError || genresError;

  return (
    <>
      <header className="bg-primary-100 relative h-[5.625rem] grid place-items-center sticky top-0 z-[9999]">
        <div className="container flex justify-between items-center">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={200} height={42} />
          </Link>

          <div className="flex justify-center gap-9">
            {/* Home link */}
            <Link
              href={staticNavLinks.main[0].href}
              className="text-btn font-semibold uppercase hover:text-green-600 transition-colors duration-200"
            >
              {staticNavLinks.main[0].name}
            </Link>

            {/* About dropdown - Static */}
            <div className="relative group">
              <Link
                href={staticNavLinks.about.href}
                className="text-btn font-semibold uppercase flex items-center gap-1 hover:text-green-600 transition-colors duration-200"
                onMouseEnter={() => handleDropdownEnter("about")}
              >
                {staticNavLinks.about.name}
                <ChevronDown className="w-3 h-3" />
              </Link>

              {openDropdown === "about" && (
                <div
                  className="absolute bg-primary-100 rounded-lg shadow-lg w-64 -left-8 top-8 opacity-100 transform scale-y-100 transition-all duration-300 origin-top z-50"
                  onMouseEnter={() => handleDropdownEnter("about")}
                  onMouseLeave={handleDropdownLeave}
                >
                  <div className="p-4">
                    <div className="space-y-1">
                      {staticNavLinks.about.items.map((item, index) => (
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
              )}
            </div>

            {/* Books Megamenu - Dynamic */}
            <div className="">
              <button
                className="text-btn font-semibold uppercase flex items-center gap-1 hover:text-green-600 transition-colors duration-200"
                onMouseEnter={() => handleDropdownEnter("books")}
              >
                Books
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Loading state */}
              {openDropdown === "books" && isLoading && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 top-full bg-white shadow-lg border border-gray-200 z-50 rounded-b-lg"
                  style={{ width: "700px" }}
                >
                  <div className="px-6 py-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                      <span className="ml-2 text-gray-600 text-sm">
                        Loading menu...
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error state */}
              {openDropdown === "books" && hasError && (
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 top-full bg-white shadow-lg border border-gray-200 z-50 rounded-b-lg"
                  style={{ width: "700px" }}
                >
                  <div className="px-6 py-8">
                    <div className="text-center text-red-600">
                      <p className="text-sm">Unable to load menu items</p>
                      <Link
                        href="/books/"
                        className="text-green-600 hover:text-green-700 underline mt-2 inline-block text-sm"
                      >
                        Browse All Books
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Megamenu */}
              <MegaMenu
                categories={categories}
                genres={genres}
                isOpen={openDropdown === "books" && !isLoading && !hasError}
                onClose={handleDropdownLeave}
              />
            </div>

            {/* Contact link */}
            <Link
              href={staticNavLinks.main[1].href}
              className="text-btn font-semibold uppercase hover:text-green-600 transition-colors duration-200"
            >
              {staticNavLinks.main[1].name}
            </Link>
          </div>

          <div className="flex items-center gap-8">
            {/* <Search /> */}
            {/* <CartIconTrigger className={`w-6 h-6`} /> */}
            {/* <Link href={`/auth/register`}>
              <Button color="info-green" size="small" text="Login" style="fill" />
            </Link> */}
            <Link href={`/contact`}>
              <Button
                color="info-green"
                size="small"
                text="Contact Us"
                style="fill"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Header;
