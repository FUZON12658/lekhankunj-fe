"use client";
import { getAllBooks, getAllCategories, getAllGenre } from "@/api/books";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CardBook from "../common/cardBook";
import { DualRangeSlider } from "../ui/dual_range_slider";

// Custom hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Memoized Filter Component to prevent unnecessary re-renders
const FilterComponent = React.memo(({ 
  filters, 
  onFiltersChange, 
  minCost, 
  maxCost, 
  onPriceRangeChange,
  onSearch,
  categoryData,
  categoryDataLoading,
  categoryDataError,
  genreData,
  genreDataLoading,
  genreDataError 
}) => {
  const handleFilterChange = useCallback((field, value) => {
    if (field === "category" || field === "genre") {
      onFiltersChange((prev) => ({
        ...prev,
        [field]: prev[field].includes(value)
          ? prev[field].filter((item) => item !== value)
          : [...prev[field], value],
      }));
    } else {
      onFiltersChange((prev) => ({ ...prev, [field]: value }));
    }
  }, [onFiltersChange]);

  const handlePriceChange = useCallback((value) => {
    onPriceRangeChange(value[0], value[1]);
  }, [onPriceRangeChange]);

  const clearFilters = useCallback(() => {
    onFiltersChange({
      keywords: "",
      duration: "",
      season: "",
      category: [],
      genre: [],
    });
    onPriceRangeChange(0, 500000);
  }, [onFiltersChange, onPriceRangeChange]);

  const bookCategories = useMemo(() => {
    if (!categoryData) return [];
    return categoryData.map((category) => ({
      value: category.slug,
      label: category.name,
      href: `/books/?category=${category.slug}`,
      id: category.id,
      description: category.description,
    }));
  }, [categoryData]);

  const bookGenre = useMemo(() => {
    if (!genreData) return [];
    return genreData.map((genre) => ({
      value: genre.slug,
      label: genre.name,
      href: `/books/?genre=${genre.slug}`,
      id: genre.id,
      description: genre.description,
    }));
  }, [genreData]);

  const hasActiveFilters = (
    filters.category.length > 0 ||
    filters.genre.length > 0 ||
    filters.keywords ||
    filters.duration ||
    filters.season ||
    minCost > 0 ||
    maxCost < 500000
  );

  return (
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
            Price Range: NRs{minCost} - NRs{maxCost}
          </label>
          <div className="px-2">
            <DualRangeSlider
              value={[minCost, maxCost]}
              onValueChange={handlePriceChange}
              min={0}
              max={500000}
              className="mb-4"
            />
          </div>
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
            <option value="digitalbook">E-book</option>
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
            {categoryDataLoading ? (
              <div className="text-gray-500 text-sm">
                Loading categories...
              </div>
            ) : categoryDataError ? (
              <div className="text-red-500 text-sm">
                Error loading categories
              </div>
            ) : bookCategories.length === 0 ? (
              <div className="text-gray-500 text-sm">
                No categories available
              </div>
            ) : (
              bookCategories.map((category) => (
                <label
                  key={category.value}
                  className="flex items-center mt-2"
                >
                  <input
                    type="checkbox"
                    value={category.value}
                    checked={filters.category.includes(category.id)}
                    onChange={() => handleFilterChange("category", category.id)}
                    className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-700 text-sm">
                    {category.label}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-2 mb-4">
          <h2 className="text-lg font-semibold mb-3">
            Genres
            {filters.genre.length > 0 && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                ({filters.genre.length} selected)
              </span>
            )}
          </h2>
          <div className="max-h-64 overflow-y-auto">
            {genreDataLoading ? (
              <div className="text-gray-500 text-sm">
                Loading Genres...
              </div>
            ) : genreDataError ? (
              <div className="text-red-500 text-sm">
                Error loading genres
              </div>
            ) : bookGenre.length === 0 ? (
              <div className="text-gray-500 text-sm">
                No genres available
              </div>
            ) : (
              bookGenre.map((genre) => (
                <label
                  key={genre.value}
                  className="flex items-center mt-2"
                >
                  <input
                    type="checkbox"
                    value={genre.value}
                    checked={filters.genre.includes(genre.id)}
                    onChange={() => handleFilterChange("genre", genre.id)}
                    className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-gray-700 text-sm">
                    {genre.label}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mb-2 transition-colors duration-200"
          >
            Clear Filters
          </button>
        )}

        {/* Search Button */}
        <button
          className="bg-green-600 w-full hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
          onClick={onSearch}
        >
          Search Books
        </button>
      </div>
    </div>
  );
});

FilterComponent.displayName = 'FilterComponent';

// Memoized Books Grid Component
const BooksGrid = React.memo(({ books, isLoading }) => {
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
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="lg:col-span-3 flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading books...</p>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return <NotFoundMessage />;
  }

  return (
    <div className="featured-books grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 lg:col-span-3 gap-4">
      {books.map((book) => (
        <Link key={book.id} href={book.link} className="block">
          <CardBook
            tag={book.tag}
            image={book.image}
            bookTags={book.bookTags}
            title={book.title}
            writer={book.author}
            price={book.price}
            discountedPrice={book.discountedPrice}
          />
        </Link>
      ))}
    </div>
  );
});

BooksGrid.displayName = 'BooksGrid';

export const Books = () => {
  const searchParams = useSearchParams();
  
  const [minCost, setMinCost] = useState(0);
  const [maxCost, setMaxCost] = useState(500000);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    keywords: "",
    duration: "",
    season: "",
    category: [],
    genre: [],
  });
  
  // Track previous URL params to detect changes
  const prevUrlParamsRef = useRef("");

  // Debounced values for API calls
  const debouncedKeywords = useDebounce(filters.keywords, 500);
  const debouncedMinCost = useDebounce(minCost, 300);
  const debouncedMaxCost = useDebounce(maxCost, 300);

  // Create debounced filters object
  const debouncedFilters = useMemo(() => ({
    ...filters,
    keywords: debouncedKeywords,
  }), [filters, debouncedKeywords]);

  const {
    data: booksData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["books", debouncedFilters, debouncedMinCost, debouncedMaxCost],
    queryFn: () =>
      getAllBooks({
        ...debouncedFilters,
        minCost: debouncedMinCost,
        maxCost: debouncedMaxCost,
      }),
    // Add some optimization options
    staleTime: 30000, // Consider data fresh for 30 seconds
    gcTime: 300000, // Keep in cache for 5 minutes (previously cacheTime)
  });

  const {
    data: categoryData,
    isLoading: categoryDataLoading,
    isError: categoryDataError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
    staleTime: 300000, // Categories change less frequently
    gcTime: 600000,
  });

  const {
    data: genreData,
    isLoading: genreDataLoading,
    isError: genreDataError,
  } = useQuery({
    queryKey: ["genre"],
    queryFn: getAllGenre,
    staleTime: 300000, // Genres change less frequently
    gcTime: 600000,
  });

  // Function to parse and apply URL parameters to filters
  const applyUrlParamsToFilters = useCallback(() => {
    const categoryParam = searchParams.get("category");
    const genreParam = searchParams.get("genre");
    const keywordsParam = searchParams.get("q") || searchParams.get("keywords");
    const formatParam = searchParams.get("format");
    
    // Create current URL param string for comparison
    const currentUrlParams = `${categoryParam || ""}-${genreParam || ""}-${keywordsParam || ""}-${formatParam || ""}`;
    
    // Only process if URL params have changed or this is the first load
    if (currentUrlParams !== prevUrlParamsRef.current && (categoryData || genreData)) {
      console.log("URL params changed, updating filters...");
      
      setFilters(prevFilters => {
        const newFilters = { ...prevFilters };
        let hasChanges = false;

        // Handle category parameter
        if (categoryParam && categoryData) {
          const matchedCategory = categoryData.find(cat => cat.slug === categoryParam);
          if (matchedCategory) {
            if (!newFilters.category.includes(matchedCategory.id)) {
              newFilters.category = [matchedCategory.id]; // Replace existing categories
              hasChanges = true;
            }
          }
        } else if (prevFilters.category.length > 0 && !categoryParam) {
          // Clear categories if no category param
          newFilters.category = [];
          hasChanges = true;
        }

        // Handle genre parameter
        if (genreParam && genreData) {
          const matchedGenre = genreData.find(genre => genre.slug === genreParam);
          if (matchedGenre) {
            if (!newFilters.genre.includes(matchedGenre.id)) {
              newFilters.genre = [matchedGenre.id]; // Replace existing genres
              hasChanges = true;
            }
          }
        } else if (prevFilters.genre.length > 0 && !genreParam) {
          // Clear genres if no genre param
          newFilters.genre = [];
          hasChanges = true;
        }

        // Handle keywords parameter
        if (keywordsParam !== prevFilters.keywords) {
          newFilters.keywords = keywordsParam || "";
          hasChanges = true;
        }

        // Handle format parameter (season field is used for format)
        if (formatParam) {
          // Map URL format values to internal format values
          const formatMapping = {
            'paperback': 'paperback',
            'ebook': 'digitalbook',
            'audiobook': 'audiobook',
          };
          
          const mappedFormat = formatMapping[formatParam] || formatParam;
          
          if (newFilters.season !== mappedFormat) {
            newFilters.season = mappedFormat;
            hasChanges = true;
          }
        } else if (prevFilters.season && !formatParam) {
          // Clear format if no format param
          newFilters.season = "";
          hasChanges = true;
        }

        // Update the ref to track current URL params
        prevUrlParamsRef.current = currentUrlParams;
        
        return hasChanges ? newFilters : prevFilters;
      });
    }
  }, [searchParams, categoryData, genreData]);

  // Effect to handle URL parameter changes (both initial load and route changes)
  useEffect(() => {
    // Only run when we have the necessary data
    if (!categoryDataLoading && !genreDataLoading) {
      applyUrlParamsToFilters();
    }
  }, [searchParams, categoryDataLoading, genreDataLoading, applyUrlParamsToFilters]);

  // Effect to listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      console.log("Pop state event detected");
      applyUrlParamsToFilters();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [applyUrlParamsToFilters]);

  // Memoized callback functions to prevent unnecessary re-renders
  const handleFiltersChange = useCallback((newFilters) => {
    if (typeof newFilters === 'function') {
      setFilters(newFilters);
    } else {
      setFilters(newFilters);
    }
    setCurrentPage(1);
  }, []);

  const handlePriceRangeChange = useCallback((newMinCost, newMaxCost) => {
    setMinCost(newMinCost);
    setMaxCost(newMaxCost);
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback(() => {
    console.log("Filters applied:", {
      ...filters,
      priceRange: [minCost, maxCost],
    });
    // Force refetch if needed
    refetch();
  }, [filters, minCost, maxCost, refetch]);

  // Transform API data to match UI expectations
  const books = useMemo(() => {
    if (!booksData) return [];

    return booksData.map((book) => ({
      id: book.id,
      title: book.name,
      author: book.author?.[0]?.name || "Unknown Author",
      slug: book.slug,
      image: book.images?.[0]?.file?.path
        ? `${process.env.NEXT_PUBLIC_FILE_HOST}${book.images[0].file.path}`
        : "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      price: book.paperback_price_npr,
      priceNpr: Math.min(
        book.paperback_price_npr || Infinity,
        book.audiobook_price_npr || Infinity,
        book.digitalbook_price_npr || Infinity
      ),
      discountedPrice: null,
      category: book.categories?.[0]?.slug || "uncategorized",
      link: `/books/${book.slug}/`,
      tag: book.status === "draft" ? "Coming Soon" : "Available",
      bookTags: book.available_on || [],
      formats: {
        physical: book.available_on?.includes("paperback") || false,
        pdf: book.available_on?.includes("digitalbook") || false,
        audiobook: book.available_on?.includes("audiobook") || false,
      },
      isbn: book.isbn,
      description: book.description,
      pageCount: book.page_count,
      language: book.language,
      edition: book.edition,
      estimatedDelivery: book.estimated_delivery_time,
      genres: book.genre?.map((g) => g.name) || [],
    }));
  }, [booksData]);

  // Loading and error states
  if (isError) {
    return (
      <div className="bg-[#EBF8F7] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">
            Error loading books. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#EBF8F7]">
      <section className="w-full container mx-auto py-10 px-4">
        {/* Page Title with Results Count */}
        <div className="heading container">
          <h1 className="font-bold text-header-2 text-gray-900 text-left my-3">
            <span className="font-recoleta">Books</span>{" "}
            {books.length > 0 && (
              <span className="text-sm font-normal text-gray-600">
                ({books.length} result{books.length !== 1 ? "s" : ""})
              </span>
            )}
          </h1>
        </div>

        <div className="search_filters flex gap-3 mb-6"></div>

        {/* Main Content Grid */}
        <section className="filter container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Filter Component - Memoized */}
          <FilterComponent
            filters={filters}
            onFiltersChange={handleFiltersChange}
            minCost={minCost}
            maxCost={maxCost}
            onPriceRangeChange={handlePriceRangeChange}
            onSearch={handleSearch}
            categoryData={categoryData}
            categoryDataLoading={categoryDataLoading}
            categoryDataError={categoryDataError}
            genreData={genreData}
            genreDataLoading={genreDataLoading}
            genreDataError={genreDataError}
          />

          {/* Books Grid - Memoized */}
          <BooksGrid books={books} isLoading={isLoading} />
        </section>
      </section>
    </div>
  );
};