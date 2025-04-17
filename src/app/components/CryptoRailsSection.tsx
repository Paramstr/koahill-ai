import React from 'react';
import FeatureCards from './FeatureCards';

const CryptoRailsSection = () => {
  return (
    <section className="bg-black text-white mt-12 py-20 px-4 sm:px-6 lg:px-16 xl:px-24 relative overflow-hidden">
      {/* Optional: Add subtle pattern background here if needed */}
      {/* Example using pseudo-elements or an SVG */}
      
      <div className="relative z-10 mt-12 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
            We help you get your R&D Tax incentive.
        </h2>
        <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
            This time, without the headache.
        </p>
        <div className="mt-10">
          <button className="rounded-full border border-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-800 transition-colors duration-150 ease-in-out inline-flex items-center">
            Take the eligibility test <span aria-hidden="true" className="ml-2">→</span>
          </button>
          
        </div>
      </div>

      <div className="mt-10">
        <FeatureCards />
      </div>

      
    </section>
   
  );
};

export default CryptoRailsSection; 