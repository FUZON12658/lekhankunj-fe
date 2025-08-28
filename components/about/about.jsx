import React from 'react';
import Button from "../common/button"

export const About = () => {
  return (
    <section className="container mx-auto py-20">
      <div className="about_section">
        <h1 className="font-bold font-recoleta text-hero">About Us</h1>
      </div>
      <div className="items-center lg:grid lg:grid-cols-2">
        <div className="p-3 sm:p-0 col-span-1 h-full mt-12">
          <img
            src="/emblem.png"
            alt="Professional Writing Services"
            className=" h-full object-contain rounded"
          />
        </div>
        <div className="pl-3">
          <p className="text-gray-800 p-3 text-center" >
            Transform your ideas into compelling narratives with our expert ghostwriting services. 
            As Nepal's pioneer in professional writing services, we bring your stories, books, and 
            content to life with creativity, precision, and authenticity.
          </p>
          <div className="flex items-center mb-4 p-3">
            <span className="text-green-500 text-xl mr-2">✔</span>
            <div>
              <ul>
                <li className="font-semibold mb-1">Professional Excellence</li>
                <li>
                  Pioneer ghostwriting company in Nepal with years of experience 
                  in transforming ideas into published works.
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center mb-4 p-3">
            <span className="text-green-500 text-xl mr-2">✔</span>
            <div>
              <div className="font-semibold mb-1">
                Complete Confidentiality
              </div>
              <p>
                Your stories remain yours. We maintain strict confidentiality and 
                ensure your authorship is protected throughout the writing process.
              </p>
            </div>
          </div>
          <div className="flex items-center mb-4 p-3">
            <span className="text-green-500 text-xl mr-2">✔</span>
            <div>
              <div className="font-semibold mb-1">Diverse Writing Expertise</div>
              <p>
                From books and novels to articles and web content, our skilled writers 
                excel across multiple genres and formats.
              </p>
            </div>
          </div>
          <div className="flex items-center mb-4 p-3">
            <span className="text-green-500 text-xl mr-2">✔</span>
            <div>
              <div className="font-semibold mb-1">
                Quality Research & Content
              </div>
              <p>
                Every project is backed by thorough research and creative excellence, 
                ensuring your content stands out in today's competitive market.
              </p>
            </div>
          </div>
          <div className="flex items-center mb-4 p-3">
            <span className="text-green-500 text-xl mr-2">✔</span>
            <div>
              <div className="font-semibold mb-1">
                Personalized Writing Solutions
              </div>
              <p>
                We adapt our writing style to match your voice and vision, 
                creating authentic content that resonates with your target audience.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-cover bg-top bg-black rounded bg-no-repeat relative mt-20"
        // style={{backgroundImage: "linear-gradient(to bottom, rgba(59, 246, 62, 0.89), rgba(16, 185, 129, 0.4)), url(/welcome-left.png);"}}
      >
        <div className="bg-opacity-50 py-20 rounded">
          <div className="container mx-auto text-center text-white max-w-[550px]">
            <h1 className="text-4xl font-bold mb-4">Start Your Writing Journey</h1>
            <p className="text-xl mb-6">
              Ready to turn your ideas into published reality? Let our expert 
              ghostwriters craft your story with professional excellence and creative flair.
            </p>
            <a href="/services/" className='mx-auto w-full flex items-center justify-center'>
              <Button style="fill" color="info-green" size="medium" iconRight="placeholder" text="Contact Us" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};