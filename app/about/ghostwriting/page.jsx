
import { ServiceSection } from '@/components/about/creative-classes';
import React from 'react'
// JSON data for Creative Classes
const ghostwritingData = {
  hero: {
    title: "About Ghostwriting",
    description: ""
  },
  features: [
    {
      id: 1,
      title: "Professional Excellence",
      description: "Pioneer ghostwriting company in Nepal with years of experience in transforming ideas into published works across various genres and formats."
    },
    {
      id: 2,
      title: "Complete Confidentiality",
      description: "Your stories remain yours. We maintain strict confidentiality and ensure your authorship is protected throughout the entire writing process."
    },
    {
      id: 3,
      title: "Diverse Writing Expertise",
      description: "From books and novels to articles and web content, our skilled ghostwriters excel across multiple genres, industries, and content formats."
    }
  ],
  cta: {
    title: "Start Your Writing Journey",
    description: "Ready to turn your ideas into published reality? Let our expert ghostwriters craft your story with professional excellence and creative flair.",
    buttonText: "Get Started"
  },
  slider: {
    images: [
      { id: 1, url: "https://picsum.photos/600/400?random=21", alt: "Professional writing" },
      { id: 2, url: "https://picsum.photos/600/400?random=22", alt: "Manuscript editing" },
      { id: 3, url: "https://picsum.photos/600/400?random=23", alt: "Published books" },
      { id: 4, url: "https://picsum.photos/600/400?random=24", alt: "Author consultation" },
      { id: 5, url: "https://picsum.photos/600/400?random=25", alt: "Content creation" }
    ]
  }
};

const page = () => {
 return <ServiceSection data={ghostwritingData} linkHref="/contact/" />;
}

export default page