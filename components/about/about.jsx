"use client"
import React, { useState, useEffect } from 'react';
import Button from "../common/button"
import Link from 'next/link';
import { NextButton, PrevButton } from '../home/hero-carousel/EmblaCarouselArrowButtons';
import { ArrowRight } from 'lucide-react';

// JSON data for the about section
const aboutData = {
  hero: {
    title: "About Lekhankunja",
    description: "Transform your ideas into compelling narratives with our expert ghostwriting services. As Nepal's pioneer in professional writing services, we bring your stories, books, and content to life with creativity, precision, and authenticity."
  },
  features: [
    {
      id: 1,
      title: "Professional Excellence",
      description: "Pioneer ghostwriting company in Nepal with years of experience in transforming ideas into published works."
    },
    {
      id: 2,
      title: "Complete Confidentiality",
      description: "Your stories remain yours. We maintain strict confidentiality and ensure your authorship is protected throughout the writing process."
    },
    {
      id: 3,
      title: "Diverse Writing Expertise",
      description: "From books and novels to articles and web content, our skilled writers excel across multiple genres and formats."
    }
  ],
  cta: {
    title: "Start Your Writing Journey",
    description: "Ready to turn your ideas into published reality? Let our expert ghostwriters craft your story with professional excellence and creative flair.",
    buttonText: "Contact Us"
  },
  slider: {
    images: [
      { id: 1, url: "https://picsum.photos/600/400?random=1", alt: "Writing workspace" },
      { id: 2, url: "https://picsum.photos/600/400?random=2", alt: "Professional writers" },
      { id: 3, url: "https://picsum.photos/600/400?random=3", alt: "Published books" },
      { id: 4, url: "https://picsum.photos/600/400?random=4", alt: "Creative process" },
      { id: 5, url: "https://picsum.photos/600/400?random=5", alt: "Writing collaboration" }
    ]
  }
};

export const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => 
        (prev + 1) % aboutData.slider.images.length
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      (prev + 1) % aboutData.slider.images.length
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? aboutData.slider.images.length - 1 : prev - 1
    );
  };

  return (
    <section className="container mx-auto py-20">
      <div className="about_section">
        <h1 className="font-bold font-recoleta text-hero">{aboutData.hero.title}</h1>
      </div>
      
      <div className="items-center lg:grid lg:grid-cols-2">
        {/* Image Slider */}
        <div className="p-3 sm:p-0 col-span-1 h-full mt-12 relative">
          <div className="relative h-96 overflow-hidden rounded-sm">
            {aboutData.slider.images.map((image, index) => (
              <div
                key={image.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
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
              className="absolute left-4 top-1/2 transform -translate-y-1/2g"
            >
              <PrevButton />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg> */}
              <NextButton />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {aboutData.slider.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pl-3">
          <p className="text-gray-800 p-3 text-left">
            {aboutData.hero.description}
          </p>
          
          {/* Features mapped from JSON */}
          {aboutData.features.map((feature) => (
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
          <div className="container mx-auto text-center text-white max-w-[34.375rem]">
            <h1 className="text-4xl font-bold mb-4">{aboutData.cta.title}</h1>
            <p className="text-xl mb-6">{aboutData.cta.description}</p>
            <Link href="/contact/" className='mx-auto w-full flex items-center justify-center'>
                <Button style="line" color="primary" size="medium" text={aboutData.cta.buttonText} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};