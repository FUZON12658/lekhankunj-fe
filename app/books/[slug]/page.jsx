"use client";
import { getBookBySlug } from "@/api/books";
import Info from "@/components/product/info";
import Similar from "@/components/product/similar";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

// Helper function to transform API data to component format
const transformApiDataToProduct = (apiData) => {
  if (!apiData) return null;

  // Determine currency and prices based on user location/timezone
  const isNepal = Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Kathmandu' || 
                  navigator.language.includes('ne') ||
                  // You can add more Nepal detection logic here
                  true; // For now, defaulting to Nepal

  const currency = isNepal ? "NPR" : "USD";
  const basePrice = isNepal ? apiData.paperback_price_npr : apiData.paperback_price_usd;
  const ebookPrice = isNepal ? apiData.digitalbook_price_npr : apiData.digitalbook_price_usd;
  const audiobookPrice = isNepal ? apiData.audiobook_price_npr : apiData.audiobook_price_usd;

  // Get primary image
  const primaryImage = apiData.images && apiData.images.length > 0 
    ? `${process.env.NEXT_PUBLIC_FILE_HOST}${apiData.images[0].file.path}` // Adjust path as needed for your image serving
    : "/book.jpg"; // fallback image

  return {
    id: apiData.id,
    title: apiData.name,
    slug: apiData.slug,
    author: {
      id: apiData.author?.[0]?.slug || "unknown",
      name: apiData.author?.[0]?.full_name || "Unknown Author",
    },
    publisher: apiData.created_by?.full_name || "Unknown Publisher", // Using created_by as publisher
    isbn: apiData.isbn,
    format: apiData.available_on.map(format => {
      // Map API format names to your component format names
      switch(format) {
        case "paperback": return "physical";
        case "digitalbook": return "ebook";
        case "audiobook": return "audiobook";
        default: return format;
      }
    }),
    pricing: {
      currency: currency,
      basePrice: basePrice,
      physicalBook: basePrice,
      ebook: ebookPrice,
      audiobook: audiobookPrice,
      salePrice: null, // Add sale logic if needed
    },
    stock: {
      status: apiData.status === "draft" ? "in_stock" : "in_stock", // Adjust based on your status logic
      quantity: 15, // Default quantity, adjust based on your inventory system
    },
    images: {
      primary: primaryImage,
      altText: `${apiData.name} book cover`,
    },
    description: {
      short: apiData.meta_description || apiData.description?.substring(0, 100) + "...",
      full: apiData.description,
      highlights: [
        {
          title: "Edition",
          description: `${apiData.edition} - ${apiData.page_count} pages`,
        },
        {
          title: "Language",
          description: apiData.language === "en" ? "English" : apiData.language,
        },
        {
          title: "Categories",
          description: apiData.categories?.map(cat => cat.name).join(", ") || "General",
        },
        {
          title: "Genre",
          description: apiData.genre?.map(g => g.name).join(", ") || "Fiction",
        },
        {
          title: "Publication",
          description: `Published on ${new Date(apiData.publication_date).toLocaleDateString()}`,
        },
      ],
      tagline: apiData.meta_description || "A captivating read that will keep you engaged from start to finish.",
    },
    shipping: {
      estimatedDelivery: apiData.estimated_delivery_time || "3-5 Business Days",
    },
    availability: {
      physical: {
        inStock: apiData.available_on.includes("paperback"),
        quantity: 15 // Default quantity
      },
      ebook: {
        inStock: apiData.available_on.includes("digitalbook"),
        unlimited: true
      },
      audiobook: {
        inStock: apiData.available_on.includes("audiobook"), 
        unlimited: true
      }
    },
    tags: [
      apiData.slug,
      ...apiData.categories?.map(cat => cat.slug) || [],
      ...apiData.genre?.map(g => g.slug) || [],
      apiData.language,
    ],
  };
};

// Helper function to calculate delivery dates
const calculateDeliveryDate = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric' 
  });
};

const Product = () => {
  const { slug } = useParams();

  const { data: apiData, isLoading, isError } = useQuery({
    queryKey: ['books-slug', slug],
    queryFn: () => getBookBySlug(slug)
  });

  React.useEffect(() => {
    console.log('API Data:', apiData);
  }, [apiData]);

  // Transform API data to component format
  const product = React.useMemo(() => {
    if (!apiData) return null;
    return transformApiDataToProduct(apiData);
  }, [apiData]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600">The book you're looking for doesn't exist or couldn't be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Info product={product} />
      <Similar slug={slug} />
    </>
  );
};

export default Product;