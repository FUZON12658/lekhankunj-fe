"use client"
import React, { useState, useEffect } from 'react';
import Button from "../common/button"
import Link from 'next/link';
import { NextButton, PrevButton } from '../home/hero-carousel/EmblaCarouselArrowButtons';

// JSON data for the team section
const teamData = {
  hero: {
    title: "Meet Our Team",
    description: ""
  },
  features: [
    {
      id: 1,
      title: "Experienced Writers",
      description: "Our team consists of published authors, professional editors, and seasoned ghostwriters with expertise across multiple genres and industries."
    },
    {
      id: 2,
      title: "Creative Instructors",
      description: "Passionate educators who have mentored hundreds of aspiring writers, helping them develop their unique voice and storytelling abilities."
    },
    {
      id: 3,
      title: "Industry Professionals",
      description: "Former publishers, literary agents, and content strategists who understand the market and can guide your work toward successful publication."
    }
  ],
  teamMembers: [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Lead Writer & Founder",
      bio: "With over 15 years in publishing, Sarah has ghostwritten 50+ books including bestsellers in business, memoir, and fiction genres.",
      image: "https://picsum.photos/300/300?random=101",
      expertise: ["Business Books", "Memoirs", "Fiction"]
    },
    {
      id: 2,
      name: "Rajesh Sharma",
      role: "Creative Writing Instructor",
      bio: "Award-winning poet and novelist who has taught creative writing for 10+ years, specializing in contemporary Nepali literature.",
      image: "https://picsum.photos/300/300?random=102",
      expertise: ["Poetry", "Fiction", "Creative Writing"]
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Senior Editor",
      bio: "Former publishing house editor with expertise in manuscript development, content strategy, and bringing stories to market.",
      image: "https://picsum.photos/300/300?random=103",
      expertise: ["Editing", "Publishing", "Content Strategy"]
    },
    {
      id: 4,
      name: "Priya Thapa",
      role: "Content Specialist",
      bio: "Digital content expert specializing in web copy, articles, and social media content that engages and converts readers.",
      image: "https://picsum.photos/300/300?random=104",
      expertise: ["Web Content", "Articles", "Digital Marketing"]
    },
    {
      id: 5,
      name: "Michael Roberts",
      role: "Technical Writer",
      bio: "Specialized in transforming complex technical concepts into accessible, engaging content for diverse audiences.",
      image: "https://picsum.photos/300/300?random=105",
      expertise: ["Technical Writing", "Documentation", "Research"]
    },
    {
      id: 6,
      name: "Anita Gurung",
      role: "Workshop Coordinator",
      bio: "Passionate about nurturing new talent, Anita manages our creative writing workshops and student mentorship programs.",
      image: "https://picsum.photos/300/300?random=106",
      expertise: ["Workshop Management", "Mentorship", "Community Building"]
    }
  ],
  cta: {
    title: "Work With Our Expert Team",
    description: "Ready to collaborate with Nepal's most experienced writing professionals? Whether you need ghostwriting services or want to join our creative classes, we're here to help you succeed.",
    buttonText: "Get In Touch"
  },
  slider: {
    images: [
      { id: 1, url: "https://picsum.photos/600/400?random=31", alt: "Team collaboration" },
      { id: 2, url: "https://picsum.photos/600/400?random=32", alt: "Creative brainstorming" },
      { id: 3, url: "https://picsum.photos/600/400?random=33", alt: "Team workshop" },
      { id: 4, url: "https://picsum.photos/600/400?random=34", alt: "Writing mentorship" },
      { id: 5, url: "https://picsum.photos/600/400?random=35", alt: "Team success" }
    ]
  }
};

// Team Member Card Component
const TeamMemberCard = ({ member }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        <img
          src={member.image}
          alt={member.name}
          className="w-20 h-20 rounded-full object-cover mb-4 sm:mb-0 sm:mr-4 flex-shrink-0"
        />
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-bold text-lg text-gray-800 mb-1">{member.name}</h3>
          <p className="text-green-600 font-semibold mb-2">{member.role}</p>
          <p className="text-gray-600 text-sm mb-3">{member.bio}</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            {member.expertise.map((skill, index) => (
              <span 
                key={index}
                className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Team Section Component
const TeamSection = ({ data, linkHref = "/contact/" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => 
        (prev + 1) % data.slider.images.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [data.slider.images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      (prev + 1) % data.slider.images.length
    );
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
                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
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

      {/* Team Members Grid */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Expert Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-cover bg-top bg-info-green-600 rounded bg-no-repeat relative mt-20">
        <div className="bg-opacity-50 py-20 rounded">
          <div className="container mx-auto text-center text-white max-w-[550px]">
            <h1 className="text-4xl font-bold mb-4">{data.cta.title}</h1>
            <p className="text-xl mb-6">{data.cta.description}</p>
            <Link href={linkHref} className='mx-auto w-full flex items-center justify-center'>
              <Button 
                style="fill" 
                color="info-green" 
                size="medium" 
                iconRight="placeholder" 
                text={data.cta.buttonText} 
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export the team page component
export const OurTeam = () => {
  return <TeamSection data={teamData} linkHref="/contact/" />;
};