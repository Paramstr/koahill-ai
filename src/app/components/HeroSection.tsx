"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the expected structure of the data returned from the API
interface FirecrawlData {
  company_name: string;
  mission: string;
  location: string;
  tags: string[];
}

const texts = [
  "AI",
  "Crypto",
  "Biotech",
  "Software",
  "Mining",
  "Robotics",
  "Research"
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<FirecrawlData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2500); // Change text every 2 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleCheckEligibility = async () => {
    if (!websiteUrl) {
      setError('Please enter a website URL.');
      setExtractedData(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setExtractedData(null);

    try {
      // Basic URL validation/cleanup (optional but recommended)
      let formattedUrl = websiteUrl.trim();
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }

      const response = await fetch('/api/firecrawl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: formattedUrl }), // Send formatted URL
      });

      const result = await response.json();

      if (!response.ok) {
        // Use the error message from the API response if available
        throw new Error(result.error || `API request failed with status ${response.status}`);
      }

      setExtractedData(result as FirecrawlData);

    } catch (err) {
      console.error("Eligibility check failed:", err);
      setError(err instanceof Error ? err.message : 'Failed to fetch eligibility data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative bg-white overflow-hidden py-24 lg:py-68">
      {/* Pattern background with low opacity */}
      <div className="absolute inset-0 z-0 opacity-5 global-pattern-background"></div>
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-1 pointer-events-none"></div>
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-1 pointer-events-none"></div>

      {/* Main container - Centered */}
      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 flex flex-col items-center justify-center text-center max-w-5xl ">
        <h1 className="--font-abc-favorit text-4xl tracking-tight text-gray-900 sm:text-5xl md:text-5xl xl:text-7xl">
        Find public funding for{' '}
        </h1>
        <h1 className="font-abc-favorit text-4xl tracking-tight mt-4 text-gray-900 sm:text-5xl md:text-6xl xl:text-7xl">
          <span className="inline-block h-[1.2em]"> {/* Height container for consistent layout */}
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
        <span className="mt-32 text-gray-800 text-2xl">
          Check your eligibility in 60 seconds
        </span>
        <div className="mt-2 flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-3xl">
          <input
            type="text"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="Enter website"
            className="shadow-lg rounded-xl border-2 border-gray-300 bg-white px-6 py-4 text-lg text-gray-900 placeholder-gray-500 focus:outline-none ring-2 ring-transparent focus:border-gray-400 flex-grow focus:placeholder-transparent transition-all duration-300 ease-in-out"
            disabled={isLoading} // Disable input during loading
          />
          <button
            onClick={handleCheckEligibility} // Added onClick handler
            className="shadow-xl rounded-xl bg-black px-8 py-4 text-lg font-semibold text-white hover:scale-102 transform transition-all duration-300 ease-in-out flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? 'Checking...' : 'Check eligibility'} {/* Dynamic button text */}
          </button>
        </div>

        {/* Results Area - Added below the button */}
        <div className="mt-8 w-full max-w-3xl text-left px-4">
          {isLoading && (
            <p className="text-center text-gray-600 animate-pulse">Checking eligibility...</p>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {extractedData && (
            <div className="fade-background-rect p-6 rounded-lg ">
              <h3 className="content-above text-lg font-semibold mb-3 text-gray-800">Eligibility Check Results:</h3>
              <div className="content-above space-y-2 text-gray-700">
                 <p><strong>Company Name:</strong> {extractedData.company_name || 'N/A'}</p>
                 <p><strong>Mission:</strong> {extractedData.mission || 'N/A'}</p>
                 <p><strong>Location:</strong> {extractedData.location || 'N/A'}</p>
                 <p><strong>Tags:</strong> {extractedData.tags?.join(', ') || 'N/A'}</p>
              </div>
            </div>
          )}
        </div>
        {/* End Results Area */}

      </div>
    </section>
  );
};

export default HeroSection;