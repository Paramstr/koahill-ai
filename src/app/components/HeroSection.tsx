"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const texts = [
  "AI Startups",
  "Consultants",
  "Biotech",
  "Software",
  "Rare Minerals",
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <section className={`relative bg-white overflow-hidden`}>
      {/* Pattern background with low opacity */}
      <div className="absolute inset-0 z-0 opacity-5 global-pattern-background"></div>
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-1 pointer-events-none"></div>
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-1 pointer-events-none"></div>
      
      {/* Main container */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between lg:gap-12 xl:gap-24">
          {/* Text Content Area */}
          <div className="w-full lg:w-[40%] py-16 lg:py-32">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl md:text-6xl xl:text-7xl">
              <span className="block">Unlocking Government Funding</span>
              <span className="block mt-1 h-[1.2em]"> {/* Adjust height as needed */}
                for{' '}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={texts[index]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="inline-block" // Added inline-block for motion layout
                  >
                    {texts[index]}.
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <p className="mt-8 text-lg text-gray-600 leading-relaxed xl:text-xl max-w-2xl">
              We&apos;re building the rails allowing Australian businesses to access the $5 billion plus in public funding.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button className="rounded-lg bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800 transition-colors duration-150 ease-in-out">
                Check eligibility
              </button>
              <Link href="/demopage">
                <button className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-base font-medium text-black hover:bg-gray-50 transition-colors duration-150 ease-in-out cursor-pointer">
                  Join waitlist →
                </button>
              </Link>
            </div>
          </div>

          {/* Image Area */}
          <div className="w-full lg:w-[50%] overflow-hidden">
            <Image
              className="h-64 w-[120%] object-cover sm:h-80 md:h-96 lg:h-full rounded-lg -mr-[20%]"
              src="/backgrounds/Kangaroo in Dreamy Sky with Promo.png"
              alt="Tendy wallet infrastructure illustration"
              priority
              width={1920}
              height={1200}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;