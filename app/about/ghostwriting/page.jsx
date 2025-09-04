
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
      title: "Our Expertise",
      description: "We work with celebrities, politicians, leaders, and respected figures whose stories can inspire society. Our professional ghostwriters ensure authenticity and creativity in every project."
    },
    {
      id: 2,
      title: "Complete Confidentiality",
      description: "Your story remains yours. We maintain strict confidentiality throughout the writing and publishing journey."
    },
    {
      id: 3,
      title: "Global Services",
      description: "Our services extend not just in Nepal but also to individuals, organizations, and businesses worldwide. Alongside ghostwriting, we encourage young writers to contribute and we also run creative writing classes (both physical and online). "
    }
  ],
  cta: {
    title: "Start Your Writing Journey",
    description: "Ready to turn your ideas into published reality? Let our expert ghostwriters craft your story with professional excellence and creative flair.",
    buttonText: "Get Started"
  },
  slider: {
    images: [
      { id: 1, url: "/ghostwriting/1.jpg", alt: "Professional writing" },
      { id: 2, url: "/ghostwriting/2.jpg", alt: "Manuscript editing" },
      { id: 3, url: "/ghostwriting/3.jpg", alt: "Published books" },
      { id: 4, url: "/ghostwriting/4.jpg", alt: "Author consultation" },
      { id: 5, url: "/ghostwriting/5.jpg", alt: "Content creation" }
    ]
  }
};

const page = () => {
 return <ServiceSection data={ghostwritingData} linkHref="/contact/" />;
}

export default page