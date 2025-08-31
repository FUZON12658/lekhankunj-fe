"use client";
import React from "react";
import Link from "next/link";

// JSON data for the team section
const teamData = {
  chairman: {
    title: "Founder Message",
    name: "Mr. Kamal Dhakal",
    position: "Founder, Lekhankunja",
    image: "/kamaldhakal.jpg",
    message: "A Commitment to Excellence and Creativity",
    description: `As the Founder of Lekhankunja, I am humbled to lead a platform devoted to celebrating and nurturing the art of writing. What began as a vision to create a space for expression, creativity, and knowledge-sharing has grown into a community that reflects our commitment to quality and innovation. Over the years, we have strived to build a reputation for excellence by introducing services and initiatives that truly resonate with our writers, readers, and learners, while adapting to the ever-evolving landscape of literature and digital expression.

At the core of Lekhankunja is a team of passionate individuals who work tirelessly to uphold high standards, foster ethical practices, and encourage authentic creativity. Our mission goes beyond providing exceptional literary experiences—we aim to continuously innovate, evolve, and contribute to a sustainable ecosystem for writers and readers alike.

Looking ahead, Lekhankunja stands ready for continued growth and meaningful impact. I extend my heartfelt gratitude to our dedicated team and supportive community whose trust and encouragement inspire us every day to reach new heights.`,
  },
  executiveTeam: [
    {
      id: 1,
      name: "Mr. David Johnson",
      role: "Creative Director",
      image: "https://picsum.photos/300/400?random=301",
    },
    {
      id: 2,
      name: "Ms. Lisa Anderson",
      role: "Chief Editorial Officer",
      image: "https://picsum.photos/300/400?random=302",
    },
    {
      id: 3,
      name: "Mr. Robert Wilson",
      role: "Head of Publishing Services",
      image: "https://picsum.photos/300/400?random=303",
    },
    {
      id: 4,
      name: "Mr. Mark Thompson",
      role: "Acting General Manager - Content",
      image: "https://picsum.photos/300/400?random=304",
    },
    {
      id: 5,
      name: "Ms. Jennifer Davis",
      role: "Head of Client Relations",
      image: "https://picsum.photos/300/400?random=305",
    },
    {
      id: 6,
      name: "Mr. Michael Brown",
      role: "General Manager - Operations",
      image: "https://picsum.photos/300/400?random=306",
    },
    {
      id: 7,
      name: "Ms. Susan Miller",
      role: "Finance Controller",
      image: "https://picsum.photos/300/400?random=307",
    },
  ],
};

// Executive Team Card Component
const ExecutiveCard = ({ member }) => {
  return (
    <div className="text-center group">
      <div className="relative overflow-hidden rounded-sm mb-4 bg-gray-100">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="font-semibold text-gray-900 text-sm mb-1">
        {member.name}
      </h3>
      <p className="text-gray-600 text-xs">{member.role}</p>
    </div>
  );
};

// Main Team Page Component
const TeamPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation would go here */}

      {/* Chairman Message Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-header-2 font-recoleta text-start text-gray-900 mb-16">
            {teamData.chairman.title}
          </h1>

          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center justify-between">
            {/* Text Content */}
            <div className="space-y-6">
              <h2 className="text-header-3 font-recoleta font-bold text-gray-900">
                {teamData.chairman.message}
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                {teamData.chairman.description}
              </p>
            </div>

            {/* Chairman Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-sm shadow-2xl">
                <img
                  src={teamData.chairman.image}
                  alt={teamData.chairman.name}
                  className="w-full h-120 object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <h3 className="text-white font-bold text-xl mb-1">
                    {teamData.chairman.name}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {teamData.chairman.position}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Team Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-header-3 font-recoleta text-center text-gray-900 mb-16">
            Team Members
          </h2>

          {/* First Row - 5 members */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {teamData.executiveTeam.slice(0, 5).map((member) => (
              <ExecutiveCard key={member.id} member={member} />
            ))}
          </div>

          {/* Second Row - 2 members centered */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 max-w-md mx-auto">
            {teamData.executiveTeam.slice(5, 7).map((member) => (
              <ExecutiveCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
