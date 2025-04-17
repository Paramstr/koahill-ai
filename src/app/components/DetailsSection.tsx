"use client";

import Link from 'next/link';


const detailsSection = () => {


  return (
    <section className={`relative bg-white overflow-hidden`}>
      {/* Pattern background */}
      <div className="absolute inset-0 z-0 global-pattern-background"></div>
      
      {/* Main container */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row items-center lg:justify-between lg:gap-12 xl:gap-24">

          {/* Text Content Area with blur backdrop */}
          <div className="w-full py-16 lg:py-32">
            <div className="relative">
              {/* Blur backdrop for better readability */}
              <div className="absolute -inset-4 backdrop-blur-sm bg-white rounded-xl z-0"></div>
              
              {/* Text content */}
              <div className="relative z-10">
                <h1 className="text-4xl font-medium tracking-tight text-gray-900 sm:text-5xl md:text-6xl xl:text-7xl">
                  <span className="block">Innovation should be rewarded</span>
                </h1>
                <p className="mt-8 text-lg text-gray-600 leading-relaxed xl:text-xl max-w-2xl">
                  We agree.
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
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default detailsSection;