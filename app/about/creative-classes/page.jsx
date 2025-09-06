import { ServiceSection } from "@/components/about/creative-classes";
import React from "react";

// JSON data for Creative Classes
const creativeClassesData = {
  hero: {
    title: "Creative Classes",
    description: "",
  },
  features: [
    {
      id: 1,
      title: "Expert Instruction",
      description:
        "Learn from published authors and experienced writing professionals who provide personalized guidance and feedback on your creative journey.",
    },
    {
      id: 2,
      title: "Interactive Workshops",
      description:
        "Engage in hands-on writing exercises, peer reviews, and collaborative projects that enhance your storytelling abilities and creative expression.",
    },
    {
      id: 3,
      title: "Multiple Genres",
      description:
        "Explore various writing forms including fiction, poetry, screenwriting, blogging, and memoir writing to discover your unique voice.",
    },
  ],
  cta: {
    title: "Join Our Creative Community",
    description:
      "Ready to develop your writing skills and connect with like-minded creatives? Enroll in our classes and start your creative writing journey today.",
    buttonText: "Enroll Now",
  },
  slider: {
    images: [
      { id: 1, url: "/creativewriting/1.jpg", alt: "Creative writing workshop" },
      { id: 2, url: "/creativewriting/2.jpg", alt: "Students in class" },
      { id: 3, url: "/creativewriting/3.jpg", alt: "Writing exercises" },
      { id: 4, url: "/creativewriting/4.jpg", alt: "Group discussions" },
      { id: 5, url: "/creativewriting/5.jpg", alt: "Creative inspiration" },
      { id: 6, url: "/creativewriting/6.jpg", alt: "Group discussions" },
      { id: 7, url: "/creativewriting/7.jpg", alt: "Creative inspiration" },
    ],
  },
};

const page = () => {
  return <ServiceSection data={creativeClassesData} linkHref="/contact/" />;
};

export default page;
