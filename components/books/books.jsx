"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Check, X } from "lucide-react";
import { DualRangeSlider } from "../ui/dual_range_slider";
import CardBook from "../common/cardBook";

export const Books = () => {
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    keywords: "",
    duration: "",
    season: "",
    category: [],
  });

  // Initialize filters based on URL query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");

    if (categoryParam) {
      setFilters((prev) => ({
        ...prev,
        category: [categoryParam],
      }));
    }
  }, []);

  const handleFilterChange = (field, value) => {
    if (field === "category") {
      setFilters((prev) => ({
        ...prev,
        category: prev.category.includes(value)
          ? prev.category.filter((cat) => cat !== value)
          : [...prev.category, value],
      }));
    } else {
      setFilters((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = () => {
    console.log("Filters applied:", {
      ...filters,
      priceRange: [minCost, maxCost],
    });
  };

  const books = [
    {
      id: 1,
      title: "Mera Ba ",
      author: "Nila Ghimire",
      slug: "mera-ba",
      image: "/mera-ba/front.jpeg",
      price: 15,
      priceNpr: 1200,
      discountedPrice: 18,
      category: "fiction",
      link: "/books/mera-ba/",
      tag: "New Release",
      bookTags: ["physical", "ebook", "audiobook"],
      formats: {
        physical: true,
        pdf: true,
        audiobook: true,
      },
      audiobook: {
        chapters: [
          {
            id: 1,
            title: "Chapter 1: Mera Ba Chapter 1",
            duration: "8:07",
            audioUrl: "/audio/audio.mp3",
          },
          {
            id: 2,
            title: "Chapter 2: Mera Ba Chapter 2",
            duration: "8:07",
            audioUrl: "/audio/audio.mp3",
          },
          {
            id: 3,
            title: "Chapter 3: Mera Ba Chapter 3",
            duration: "8:07",
            audioUrl: "/audio/audio.mp3",
          },
          {
            id: 4,
            title: "Chapter 4: Mera Ba Chapter 4",
            duration: "8:07",
            audioUrl: "/audio/audio.mp3",
          },
        ],
      },
    },
    {
      id: 2,
      title: "Sapiens: A Brief History of Humankind",
      author: "Yuval Noah Harari",
      slug: "sapiens",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      price: 25,
      priceNpr: 2000,
      discountedPrice: 30,
      category: "non-fiction",
      link: "/books/sapiens/",
      tag: "Bestseller",
      bookTags: ["physical", "ebook", "audiobook"],
      formats: {
        physical: true,
        pdf: false,
        audiobook: false,
      },
    },
    {
      id: 3,
      title: "The Girl with the Dragon Tattoo",
      author: "Stieg Larsson",
      slug: "dragon-tattoo",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      price: 18,
      priceNpr: 1440,
      discountedPrice: 22,
      category: "mystery-thriller",
      link: "/books/dragon-tattoo/",
      tag: "Popular",
      bookTags: ["physical", "ebook"],
      formats: {
        physical: true,
        pdf: false,
        audiobook: false,
      },
    },
    {
      id: 4,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      slug: "pride-prejudice",
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
      price: 12,
      priceNpr: 960,
      discountedPrice: 15,
      category: "romance",
      link: "/books/pride-prejudice/",
      tag: "Classic",
      bookTags: [ "ebook", "audiobook"],
      formats: {
        physical: true,
        pdf: false,
        audiobook: false,
      },
    },
    {
      id: 5,
      title: "Dune",
      author: "Frank Herbert",
      slug: "dune",
      image:
        "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=300&h=400&fit=crop",
      price: 22,
      priceNpr: 1760,
      discountedPrice: 26,
      category: "sci-fi-fantasy",
      link: "/books/dune/",
      tag: "Award Winner",
      bookTags: ["physical", "audiobook"],
      formats: {
        physical: true,
        pdf: false,
        audiobook: false,
      },
    },
    {
      id: 6,
      title: "Steve Jobs",
      author: "Walter Isaacson",
      slug: "steve-jobs",
      image:
        "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop",
      price: 28,
      priceNpr: 2240,
      discountedPrice: 32,
      category: "biography-memoir",
      link: "/books/steve-jobs/",
      tag: "Biography",
      bookTags: ["physical", "ebook"],
      formats: {
        physical: true,
        pdf: false,
        audiobook: false,
      },
    },
  ];

  const bookCategories = [
    { value: "fiction", label: "Fiction", href: "/books/?category=fiction" },
    {
      value: "non-fiction",
      label: "Non-Fiction",
      href: "/books/?category=non-fiction",
    },
    {
      value: "mystery-thriller",
      label: "Mystery & Thriller",
      href: "/books/?category=mystery-thriller",
    },
    { value: "romance", label: "Romance", href: "/books/?category=romance" },
    {
      value: "sci-fi-fantasy",
      label: "Science Fiction & Fantasy",
      href: "/books/?category=sci-fi-fantasy",
    },
    {
      value: "biography-memoir",
      label: "Biography & Memoir",
      href: "/books/?category=biography-memoir",
    },
    {
      value: "self-help",
      label: "Self-Help & Personal Development",
      href: "/books/?category=self-help",
    },
    {
      value: "childrens-ya",
      label: "Children's & Young Adult",
      href: "/books/?category=childrens-ya",
    },
    {
      value: "history-politics",
      label: "History & Politics",
      href: "/books/?category=history-politics",
    },
    {
      value: "business-economics",
      label: "Business & Economics",
      href: "/books/?category=business-economics",
    },
    {
      value: "health-wellness",
      label: "Health & Wellness",
      href: "/books/?category=health-wellness",
    },
    {
      value: "travel-adventure",
      label: "Travel & Adventure",
      href: "/books/?category=travel-adventure",
    },
    {
      value: "cooking-food",
      label: "Cooking & Food",
      href: "/books/?category=cooking-food",
    },
    {
      value: "art-design",
      label: "Art & Design",
      href: "/books/?category=art-design",
    },
    {
      value: "religion-spirituality",
      label: "Religion & Spirituality",
      href: "/books/?category=religion-spirituality",
    },
    {
      value: "tech-science",
      label: "Technology & Science",
      href: "/books/?category=tech-science",
    },
  ];

  // Filter books based on selected criteria
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Category filter
      const categoryMatch =
        filters.category.length === 0 ||
        filters.category.includes(book.category);

      // Price filter
      const priceMatch = book.price >= minCost && book.price <= maxCost;

      // Keywords filter
      const keywordMatch =
        !filters.keywords ||
        book.title.toLowerCase().includes(filters.keywords.toLowerCase());

      return categoryMatch && priceMatch && keywordMatch;
    });
  }, [books, filters, minCost, maxCost]);

  const FormatCheckmark = ({ isAvailable }) => (
    <div
      className={`w-4 h-4 rounded-full flex items-center justify-center ${
        isAvailable ? "bg-green-600" : "bg-red-500"
      }`}
    >
      {isAvailable ? (
        <Check className="w-2.5 h-2.5 text-white" />
      ) : (
        <X className="w-2.5 h-2.5 text-white" />
      )}
    </div>
  );

  const NotFoundMessage = () => (
    <div className="lg:col-span-3 flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-24 w-24 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.002-5.824-2.582M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No books found
        </h3>
        <p className="text-gray-500 mb-6 max-w-md">
          We couldn't find any books matching your current filters. Try
          adjusting your search criteria or clearing some filters.
        </p>
        <button
          onClick={() => {
            setFilters({
              keywords: "",
              duration: "",
              season: "",
              category: [],
            });
            setMinCost(0);
            setMaxCost(50);
          }}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#EBF8F7] ">
    <section className="w-full  container mx-auto py-10 px-4">
      {/* Page Title with Results Count */}
      <div className="heading container">
        <h1 className="font-bold text-header-2  text-gray-900 text-left my-3">
          <span className="font-recoleta">Books</span>{" "}
          {filteredBooks.length > 0 && (
            <span className="text-sm font-normal text-gray-600">
              ({filteredBooks.length} result
              {filteredBooks.length !== 1 ? "s" : ""})
            </span>
          )}
        </h1>
      </div>

      <div className="search_filters flex gap-3 mb-6"></div>

      {/* Main Content Grid */}
      <section className="filter container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Filter Form */}
        <div className="filter-container lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Keywords */}
            <div className="mb-4">
              <label
                htmlFor="keywords"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Keywords
              </label>
              <input
                type="text"
                id="keywords"
                name="q"
                value={filters.keywords}
                onChange={(e) => handleFilterChange("keywords", e.target.value)}
                className="appearance-none border outline-none ring-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:border-green-500"
                placeholder="Enter keywords"
              />
            </div>

            {/* Price Range with Dual Range Slider */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price Range: ${minCost} - ${maxCost}
              </label>
              <div className="px-2">
                <DualRangeSlider
                  value={[minCost, maxCost]}
                  onValueChange={(value) => {
                    setMinCost(value[0]);
                    setMaxCost(value[1]);
                    setCurrentPage(1);
                  }}
                  min={0}
                  max={50}
                  className="mb-4"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label
                htmlFor="duration"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Reading Time
              </label>
              <select
                id="duration"
                name="duration"
                value={filters.duration}
                onChange={(e) => handleFilterChange("duration", e.target.value)}
                className="outline-none ring-0 block w-full bg-white border px-2 py-2 pr-8 rounded focus:border-green-500"
              >
                <option value="">Any</option>
                <option value="quick">Quick Read (1-2 hours)</option>
                <option value="short">Short Read (3-5 hours)</option>
                <option value="medium">Medium Read (6-10 hours)</option>
                <option value="long">Long Read (10+ hours)</option>
              </select>
            </div>

            {/* Format */}
            <div className="mb-4">
              <label
                htmlFor="season"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Format
              </label>
              <select
                id="season"
                name="season"
                value={filters.season}
                onChange={(e) => handleFilterChange("season", e.target.value)}
                className="outline-none ring-0 block w-full bg-white border px-2 py-2 pr-8 rounded focus:border-green-500"
              >
                <option value="">Any Format</option>
                <option value="paperback">Paperback</option>
                <option value="hardcover">Hardcover</option>
                <option value="ebook">E-book</option>
                <option value="audiobook">Audiobook</option>
              </select>
            </div>

            {/* Book Category Checkboxes */}
            <div className="bg-white p-2 mb-4">
              <h2 className="text-lg font-semibold mb-3">
                Categories
                {filters.category.length > 0 && (
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    ({filters.category.length} selected)
                  </span>
                )}
              </h2>
              <div className="max-h-64 overflow-y-auto">
                {bookCategories.map((category) => (
                  <label
                    key={category.value}
                    className="flex items-center mt-2"
                  >
                    <input
                      type="checkbox"
                      value={category.value}
                      checked={filters.category.includes(category.value)}
                      onChange={(e) =>
                        handleFilterChange("category", category.value)
                      }
                      className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="ml-2 text-gray-700 text-sm">
                      {category.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            {(filters.category.length > 0 ||
              filters.keywords ||
              filters.duration ||
              filters.season ||
              minCost > 0 ||
              maxCost < 50) && (
              <button
                onClick={() => {
                  setFilters({
                    keywords: "",
                    duration: "",
                    season: "",
                    category: [],
                  });
                  setMinCost(0);
                  setMaxCost(50);
                }}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-2 transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}

            {/* Search Button */}
            <button
              className="bg-green-600 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
              onClick={handleSubmit}
            >
              Search Books
            </button>
          </div>
        </div>

        {/* Books Grid or No Results */}
        {filteredBooks.length === 0 ? (
          <NotFoundMessage />
        ) : (
          <div className="featured-books grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:col-span-3 gap-4">
            {filteredBooks.map((book) => (
              <a key={book.id} href={book.link} className="block">
                <CardBook
                  tag={book.tag}
                  image={book.image}
                  bookTags={book.bookTags}
                  title={book.title}
                  writer={book.author}
                  price={book.price}
                  discountedPrice={book.discountedPrice}
                />
              </a>
            ))}
          </div>
        )}
      </section>
    </section>
    </div>
  );
};
