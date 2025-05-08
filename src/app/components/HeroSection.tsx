"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const texts = [
  "Funding",
  "Tax Incentives",
  "Grants",
  "Investors",
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2500); // Change text every 2.5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* Pattern background with low opacity */}
      <div className="absolute inset-0 z-0 opacity-5 global-pattern-background"></div>
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-1 pointer-events-none"></div>
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-1 pointer-events-none"></div>

      {/* Main container - Two columns */}
      <div className="ml-20 relative z-10 mx-auto px-4 sm:px-6 lg:px-16 xl:px-4 flex flex-col lg:flex-row items-center max-w-8xl">
        {/* Left Column: Content */}
        <div className="lg:w-1/2 align-text-top lg:text-left lg:mr-12">
          <div className="fade-background-rect">
            <h1 className="content-above --font-abc-favorit text-6xl tracking-tight text-gray-900 sm:text-5xl md:text-5xl xl:text-7xl">
              Helping startups find
            </h1>
            <h1 className="content-above --font-abc-favorit text-5xl tracking-tight text-gray-700 sm:text-4xl md:text-4xl xl:text-7xl mt-2">
              <span className="inline-block h-[1.2em]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={texts[index]}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="inline-block"
                  >
                    {texts[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </div>
          
      
          <button className="mt-6 shadow-xl rounded-xl bg-black px-6 py-3 text-lg font-semibold text-white hover:scale-102 transform transition-all duration-300 ease-in-out flex items-center justify-center min-w-[180px] mx-auto lg:mx-0">
            Get Started
          </button>

        </div>

        {/* Right Column: Image */}
        <div className="lg:w-1/2 mt-12 lg:mt-0">
           <div className="relative aspect-[16/9] w-[120%] lg:w-full ml-auto">
              <Image
                src="/backgrounds/bg_pastel_1.png"
                alt="Kangaroo background image"
                fill
                className="object-cover"
                priority
              />
              {/* Grant 1 SVG */}
              <div className="absolute top-1/4 -left-14 z-10 w-190 h-85 transform -translate-y-1/2">
                <Image
                  src="/hero section/grant 1.png"
                  alt="Grant 1"
                  fill
                  className="object-contain drop-shadow-md"
                />
              </div>
              {/* Grant 2 SVG */}
              <div className="mb-12 absolute top-5/7 -left-14 z-10 w-190 h-85 transform -translate-y-1/2">
                <Image
                  src="/hero section/grant 2.png"
                  alt="Grant 2"
                  fill
                  className="object-contain drop-shadow-md"
                />
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;