"use client"
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllBooks } from "@/api/books";
import Button from "../common/button";
import CardBook from "../common/cardBook";
import Link from "next/link";

const Featured = () => {
  const { data: booksData, isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: getAllBooks,
  });

  // Transform and filter featured books
  const featuredBooks = useMemo(() => {
    if (!booksData) return [];
    
    // Transform API data to match UI expectations
    const transformedBooks = booksData.map((book) => ({
      id: book.id,
      title: book.name,
      author: book.author?.[0]?.name || "Unknown Author",
      slug: book.slug,
      image: book.images?.[0]?.file?.path 
        ? `${process.env.NEXT_PUBLIC_FILE_HOST}${book.images[0].file.path}` 
        : "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      price: Math.min(
        book.paperback_price_usd || Infinity,
        book.audiobook_price_usd || Infinity,
        book.digitalbook_price_usd || Infinity
      ) / 100, // Convert cents to dollars if needed
      priceNpr: Math.min(
        book.paperback_price_npr || Infinity,
        book.audiobook_price_npr || Infinity,
        book.digitalbook_price_npr || Infinity
      ),
      discountedPrice: null, // Set if you have discount logic
      category: book.categories?.[0]?.slug || "uncategorized",
      link: `/books/${book.slug}/`,
      tag: book.status === "draft" ? "Coming Soon" : "Available",
      bookTags: book.available_on || [],
      formats: {
        physical: book.available_on?.includes("paperback") || false,
        pdf: book.available_on?.includes("digitalbook") || false,
        audiobook: book.available_on?.includes("audiobook") || false,
      },
      genres: book.genre?.map(g => g.name) || [],
      featured: book.featured || false,
    }));

    // Filter only featured books
    return transformedBooks.filter(book => book.featured === true);
  }, [booksData]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-12 bg-[#EBF8F7] items-center py-24">
        <div className="text-header-2 font-recoleta">Featured Books</div>
        <div className="container flex gap-6 justify-center">
          {/* Loading skeletons */}
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="w-64 animate-pulse">
              <div className="bg-gray-300 h-80 w-full rounded-lg mb-4"></div>
              <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
              <div className="bg-gray-300 h-3 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-12 bg-[#EBF8F7] items-center py-24">
        <div className="text-header-2 font-recoleta">Featured Books</div>
        <div className="container text-center">
          <p className="text-red-600">Unable to load featured books at the moment.</p>
        </div>
      </div>
    );
  }

  // Don't render the section if no featured books found
  if (featuredBooks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-12 bg-[#EBF8F7] items-center py-24">
      <div className="text-header-2 font-recoleta">Featured Books</div>
      <div className="container flex gap-6 flex-wrap justify-center">
        {featuredBooks.map((book) => (
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
      <Button
        text="Start Shopping"
        style="fill"
        color="info-green"
        iconRight="placeholder"
        size="small"
      />
    </div>
  );
};

export default Featured;