"use client";
import React, { useState, useEffect } from "react";
import Button from "../common/button";
import Link from "next/link";
import {
  NextButton,
  PrevButton,
} from "../home/hero-carousel/EmblaCarouselArrowButtons";

// JSON data for Ghostwriting Services

// Reusable Section Component
export const ServiceSection = ({ data, linkHref = "/contact/" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.slider.images.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [data.slider.images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.slider.images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? data.slider.images.length - 1 : prev - 1
    );
  };

  return (
    <section className="container mx-auto py-20">
      <div className="about_section">
        <h1 className="font-bold font-recoleta text-hero">{data.hero.title}</h1>
      </div>

      <div className="items-center lg:grid lg:grid-cols-2">
        {/* Image Slider */}
        <div className="p-3 sm:p-0 col-span-1 h-full mt-12 relative">
          <div className="relative h-96 overflow-hidden rounded-lg">
            {data.slider.images.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
            >
              <PrevButton />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <NextButton />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {data.slider.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-white"
                      : "bg-white bg-opacity-50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pl-3">
          <p className="text-gray-800 p-3 text-center">
            {data.hero.description}
          </p>

          {/* Features mapped from JSON */}
          {data.features.map((feature) => (
            <div key={feature.id} className="flex items-center mb-4 p-3">
              <span className="text-green-500 text-xl mr-2">✔</span>
              <div>
                <div className="font-semibold mb-1">{feature.title}</div>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-cover bg-top bg-info-green-600 rounded bg-no-repeat relative mt-20">
        <div className="bg-opacity-50 py-20 rounded">
          <div className="container mx-auto text-center text-white max-w-[550px]">
            <h1 className="text-4xl font-bold mb-4">{data.cta.title}</h1>
            <p className="text-xl mb-6">{data.cta.description}</p>
            <Link
              href={linkHref}
              className="mx-auto w-full flex items-center justify-center"
            >
              <Button
                style="line"
                color="white"
                size="medium"
                text={data.cta.buttonText}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
