"use client";
import Info from "@/components/product/info";
import Similar from "@/components/product/similar";
import { useParams } from "next/navigation";

const PRODUCT_ARRAY = [
  {
    id: "1",
    title: "The Island of Doctor Moreau",
    slug: "the-island-of-dr-moreau",
    author: {
      id: "h-g-wells",
      name: "H.G. Wells",
    },
    publisher: "Random House Publishing Group",
    isbn: "9780486290270",
    format: ["physical", "ebook", "audiobook"],

    pricing: {
      currency: "NPR",
      basePrice: 890.0,
      physicalBook: 890.0,
      ebook: 623.0, // 30% less than physical
      audiobook: 1068.0, // 20% more than physical
      salePrice: null,
    },
    stock: {
      status: "in_stock",
      quantity: 15,
    },
    images: {
      primary: "/book.jpg",
      altText: "The Island of Doctor Moreau by H.G. Wells book cover",
    },
    description: {
      short:
        "A haunting tale of scientific experimentation and moral boundaries on a mysterious island.",
      full: "First published in 1896, The Island of Doctor Moreau is one of H.G. Wells' most disturbing and thought-provoking science fiction novels. The story follows Edward Prendick, a shipwrecked man who finds himself on a remote island where the enigmatic Dr. Moreau conducts horrifying experiments, transforming animals into human-like beings through vivisection and surgical procedures. As Prendick discovers the dark truth behind Moreau's work, he must confront questions about the nature of humanity, scientific ethics, and the thin line between civilization and savagery.",
      highlights: [
        {
          title: "Classic Science Fiction",
          description:
            "One of the pioneering works of science fiction that explores themes still relevant today.",
        },
        {
          title: "Ethical Questions",
          description:
            "Examines the moral implications of scientific experimentation and the limits of human knowledge.",
        },
        {
          title: "Psychological Horror",
          description:
            "A masterful blend of adventure and horror that questions what it means to be human.",
        },
        {
          title: "Influential Literature",
          description:
            "A work that has influenced countless science fiction writers and filmmakers.",
        },
        {
          title: "Timeless Themes",
          description:
            "Explores evolution, ethics, and the relationship between humans and animals.",
        },
      ],
      tagline:
        "A chilling exploration of science without conscience and the boundaries of human nature.",
    },
    shipping: {
      insideValley: {
        estimatedDelivery: "29 August",
        description:
          "Faster delivery within the valley. Orders placed before 2 PM are processed the same day.",
      },
      outsideValley: {
        estimatedDelivery: "29 August - 31 August",
        description:
          "Outside the valley, orders arrive in 2-3 days near district HQs or major towns; rural or remote areas may take longer.",
      },
    },
    availability: {
      physical: {
        inStock: true,
        quantity: 15
      },
      ebook: {
        inStock: true,
        unlimited: true
      },
      audiobook: {
        inStock: true, 
        unlimited: true
      }
    },
    tags: [
      "h-g-wells",
      "classic",
      "science-fiction",
      "horror",
      "vivisection",
      "evolution",
    ],
  },
];

const Product = () => {
  const { slug } = useParams();
  const product = PRODUCT_ARRAY.find((prod) => prod.slug === "the-island-of-dr-moreau");

  if (!product) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <p className="text-gray-600">The book you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Info product={product} />
      <Similar />
    </>
  );
};

export default Product;