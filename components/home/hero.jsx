"use client"
import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllBooks } from "@/api/books";
import Image from "next/image";
import Button from "../common/button";
import EmblaCarousel from "./hero-carousel/EmblaCarousel";

const OPTIONS = { containScroll: false, align: 'start' };

const Hero = () => {
  const { data: booksData, isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: getAllBooks,
  });

  // Generate slides from book images
  const SLIDES = useMemo(() => {
    if (!booksData) return [];
    
    return booksData.map((book, index) => {
      const imageUrl = book.images?.[0]?.file?.path 
        ? `${process.env.NEXT_PUBLIC_FILE_HOST}${book.images[0].file.path}` 
        : "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop";

      return (
        <Image
          key={book.id || index}
          src={imageUrl}
          alt={book.name || `Book ${index + 1}`}
          width={300}
          height={400}
          className="w-full h-full object-contain rounded-lg"
        />
      );
    });
  }, [booksData]);

  // Fallback slides for loading state (minimum 5 slides)
  const LOADING_SLIDES = Array.from({ length: 5 }, (_, index) => (
    <div
      key={`loading-${index}`}
      className="w-full h-full bg-gray-300 animate-pulse rounded-lg flex items-center justify-center"
    >
      <div className="text-gray-500">Loading...</div>
    </div>
  ));

  // Fallback slides for error state (minimum 5 slides)
  const ERROR_SLIDES = Array.from({ length: 5 }, (_, index) => (
    <Image
      key={`fallback-${index}`}
      src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"
      alt={`Fallback Book ${index + 1}`}
      width={300}
      height={400}
      className="w-full h-full object-contain rounded-lg"
    />
  ));

  // Ensure minimum slides for proper carousel width
  const getMinimumSlides = (slides) => {
    const minSlides = 5;
    if (slides.length >= minSlides) return slides;
    
    // If we have fewer slides, duplicate them to reach minimum
    const duplicatedSlides = [...slides];
    while (duplicatedSlides.length < minSlides) {
      duplicatedSlides.push(...slides);
    }
    return duplicatedSlides.slice(0, minSlides);
  };

  const slidesToShow = isLoading ? LOADING_SLIDES : isError ? ERROR_SLIDES : getMinimumSlides(SLIDES);

  return (
    <div className="container flex items-center justify-center gap-24 py-10">
      <div className="flex flex-col gap-6">
        <p className="text-hero font-recoleta">Your Literary Universe Awaits</p>
        <p className="text-body-2 text-primary-600">
          Discover, read, and connect with the world's most captivating stories. 
          From physical books to digital adventures, your perfect read is just a click away.
        </p>
        <div className="flex gap-6">
          <Button 
            style="fill" 
            color="info-green" 
            size="medium" 
            iconRight="placeholder" 
            text="Explore Books" 
          />
        </div>
      </div>
      <EmblaCarousel slides={slidesToShow} options={OPTIONS} />
    </div>
  );
};

export default Hero;