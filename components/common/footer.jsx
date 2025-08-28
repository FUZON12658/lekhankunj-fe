"use client";
import Image from "next/image";
import Button from "../common/button";
import Tag from "../common/tag";
import Link from "next/link";
import { Fragment } from "react";

const socialMediaLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com/yangritrip",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/yangritrip",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        className="w-7 h-7"
        viewBox="0,0,256,256"
      >
        <g
          fill="currentColor"
          fillRule="nonzero"
          stroke="none"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeDasharray=""
          strokeDashoffset="0"
          fontFamily="none"
          fontWeight="none"
          fontSize="none"
          textAnchor="none"
          style={{ mixBlendMode: "normal" }}
        >
          <g transform="scale(8.53333,8.53333)">
            <path d="M15,2c-7.168,0 -13,5.832 -13,13c0,7.168 5.832,13 13,13c7.168,0 13,-5.832 13,-13c0,-7.168 -5.832,-13 -13,-13zM11.66602,6h6.66602c3.125,0 5.66797,2.54202 5.66797,5.66602v6.66602c0,3.125 -2.54202,5.66797 -5.66602,5.66797h-6.66602c-3.125,0 -5.66797,-2.54202 -5.66797,-5.66602v-6.66602c0,-3.125 2.54202,-5.66797 5.66602,-5.66797zM11.66602,8c-2.021,0 -3.66602,1.64597 -3.66602,3.66797v6.66602c0,2.021 1.64597,3.66602 3.66797,3.66602h6.66602c2.021,0 3.66602,-1.64597 3.66602,-3.66797v-6.66601c0,-2.021 -1.64597,-3.66602 -3.66797,-3.66602zM19.66797,9.66602c0.368,0 0.66602,0.29802 0.66602,0.66602c0,0.368 -0.29801,0.66797 -0.66602,0.66797c-0.368,0 -0.66797,-0.29997 -0.66797,-0.66797c0,-0.368 0.29997,-0.66602 0.66797,-0.66602zM15,10c2.757,0 5,2.243 5,5c0,2.757 -2.243,5 -5,5c-2.757,0 -5,-2.243 -5,-5c0,-2.757 2.243,-5 5,-5zM15,12c-1.65685,0 -3,1.34315 -3,3c0,1.65685 1.34315,3 3,3c1.65685,0 3,-1.34315 3,-3c0,-1.65685 -1.34315,-3 -3,-3z"></path>
          </g>
        </g>
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@yangritrip",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/9779851234567",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/yangritrip",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
];

const Footer = () => {
  const metadata = [
    {
      linkType: "About Bookstore",
      links: [
        { title: "Explore", url: "/" },
        { title: "Jobs", url: "/", tag: "new!" },
        { title: "About Us", url: "/" },
        { title: "Contact Us", url: "/" },
      ],
    },
    {
      linkType: "Others",
      links: [
        { title: "Privacy Policy", url: "/" },
        { title: "Terms of Service", url: "/" },
        { title: "Help Center", url: "/" },
      ],
    },
  ];

  // const socialMediaLinks = [
  //   {
  //     socialMedia: "Facebook",
  //     link: (
  //       <Link href="">
  //         <Image src="/placeholder.png" alt="Facebook" width={24} height={24} />
  //       </Link>
  //     ),
  //   },
  //   {
  //     socialMedia: "Twitter",
  //     link: (
  //       <Link href="https://www.twitter.com">
  //         <Image src="/placeholder.png" alt="Twitter" width={24} height={24} />
  //       </Link>
  //     ),
  //   },
  //   {
  //     socialMedia: "Instagram",
  //     link: (
  //       <Link href="https://www.instagram.com">
  //         <Image
  //           src="/placeholder.png"
  //           alt="Instagram"
  //           width={24}
  //           height={24}
  //         />
  //       </Link>
  //     ),
  //   },
  //   {
  //     socialMedia: "LinkedIn",
  //     link: (
  //       <Link href="https://www.linkedin.com">
  //         <Image src="/placeholder.png" alt="LinkedIn" width={24} height={24} />
  //       </Link>
  //     ),
  //   },
  //   {
  //     socialMedia: "YouTube",
  //     link: (
  //       <Link href="https://www.youtube.com">
  //         <Image src="/placeholder.png" alt="YouTube" width={24} height={24} />
  //       </Link>
  //     ),
  //   },
  // ];

  return (
    <div className="bg-[#FFF6EC] grid place-items-center">
      <div className="container py-10">
        <div className="flex items-start justify-between">
          <div className="max-w-md flex flex-col gap-6">
            <Image src="/logo.png" alt="Logo" width={200} height={42} />
            <p className="text-body-2 text-primary-600">
              The largest, most complete and trusted online bookstore in the
              world. With us, you can shop online & help save your high street
              at the same time
            </p>
            <div className="flex gap-4">
              <Button
                text="Google Play"
                style="fill"
                color="primary"
                size="medium"
                iconLeft="googleplay"
              />
              <Button
                text="App Store"
                style="line"
                color="primary"
                size="medium"
                iconLeft="appleicon"
              />
            </div>
          </div>
          <div className="flex gap-58">
            {metadata.map((item) => (
              <div className="" key={item.linkType}>
                <h4 className="text-subtitle-2 pb-6">{item.linkType}</h4>
                <ul className="flex flex-col gap-6">
                  {item.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.url}
                        className="text-primary-600 hover:underline relative"
                      >
                        {link.title}{" "}
                        {link.tag && (
                          <div className="absolute top-0 left-12">
                            <Tag tag={link.tag} color="var(--terser-700)" />
                          </div>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between py-6">
          <p className="text-body-3 text-primary-400">
            Copyright © 2022 Bookstore. All rights reserved
          </p>
          <div className="socialMediaLayer flex items-start -mt-5 gap-3 ">
            {socialMediaLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-8 h-8 sm:w-10 sm:h-10 bg-black/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#1ec341] hover:scale-110 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-[#1ec341]/25"
                aria-label={`Follow us on ${social.name}`}
              >
                <div className="group-hover:scale-110 text-black transition-transform duration-200">
                  {social.icon}
                </div>
                {/* Tooltip - hidden on mobile */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap hidden sm:block">
                  {social.name}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
