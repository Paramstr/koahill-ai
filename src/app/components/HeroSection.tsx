"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilLine } from 'lucide-react';

// Define the expected structure of the data returned from the API
interface FirecrawlData {
  company_name: string;
  mission: string;
  location: string;
  tags: string[];
}

// Define the structure of the funding item from Supabase
// Ensure this matches the interface in your API route and your Supabase table
interface FundingItem {
  id: string; // uuid
  title: string | null;
  description: string | null;
  tags: string[] | null; // _text
  region: string | null;
  entity_type: string | null;
  source: string | null;
  funding_type: string | null;
  amount_min: number | null; // numeric
  amount_max: number | null; // numeric
  deadline: string | null; // date
  recurring: boolean | null; // bool
  url: string | null;
  // embedding: number[] | null; // vector - Likely not needed for display
  created_at: string; // timestamp
}

// Add EditableFirecrawlData interface
interface EditableFirecrawlData extends FirecrawlData {
  isEditing: boolean;
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
  const [loadingPhase, setLoadingPhase] = useState<string>('');
  const [extractedData, setExtractedData] = useState<EditableFirecrawlData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Add state for funding data
  const [fundingItems, setFundingItems] = useState<FundingItem[]>([]);
  const [isFundingLoading, setIsFundingLoading] = useState(false);
  const [fundingError, setFundingError] = useState<string | null>(null);

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
    setLoadingPhase('Researching website');
    setError(null);
    setExtractedData(null);
    // Reset funding state on new search
    setFundingItems([]);
    setFundingError(null);

    // Set up loading phase timer
    const timer = setTimeout(() => {
      setLoadingPhase('Finding Details');
    }, 4000);

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

      const currentExtractedData = {
        ...result as FirecrawlData,
        isEditing: false
      };
      setExtractedData(currentExtractedData);
      setLoadingPhase('Done!');

      // --- Fetch funding data after successful extraction ---
      if (currentExtractedData) {
        setIsFundingLoading(true);
        setFundingError(null);
        try {
          // Create a string representation of the extracted data for the API
          // TODO: Refine this string for better relevance matching if needed
          const dataString = JSON.stringify(currentExtractedData);

          const fundingResponse = await fetch('/api/supabase', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ extractedData: dataString }),
          });

          const fundingResult = await fundingResponse.json();

          if (!fundingResponse.ok) {
            throw new Error(fundingResult.error || `Funding API request failed with status ${fundingResponse.status}`);
          }

          setFundingItems(fundingResult as FundingItem[]);

        } catch (fundingErr) {
           console.error("Funding fetch failed:", fundingErr);
           setFundingError(fundingErr instanceof Error ? fundingErr.message : 'Failed to fetch funding data.');
           setFundingItems([]); // Clear items on error
        } finally {
          setIsFundingLoading(false);
        }
      }
      // --- End Fetch funding data ---

    } catch (err) {
      console.error("Eligibility check failed:", err);
      setError(err instanceof Error ? err.message : 'Failed to fetch eligibility data.');
    } finally {
      setIsLoading(false);
      clearTimeout(timer);
    }
  };

  const handleEdit = (field: keyof FirecrawlData, value: string) => {
    if (!extractedData) return;
    
    setExtractedData(prev => {
      if (!prev) return null;
      if (field === 'tags') {
        return {
          ...prev,
          [field]: value.split(',').map(tag => tag.trim())
        };
      }
      return {
        ...prev,
        [field]: value
      };
    });
  };

  // Helper function to check if a value is "Not Found"
  const isNotFound = (value: string | string[]) => {
    if (Array.isArray(value)) {
      // For tags, consider it "Not Found" if the array contains only "Not Found"
      return value.length === 1 && value[0] === "Not Found";
    }
    return value === "Not Found";
  };

  // Helper function to format amount range
  const formatAmount = (min: number | null, max: number | null): string => {
    if (min && max) {
      if (min === max) return `$${min.toLocaleString()}`;
      return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    } else if (min) {
      return `From $${min.toLocaleString()}`;
    } else if (max) {
      return `Up to $${max.toLocaleString()}`;
    }
    return 'N/A';
  };

  // Helper function to format date
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      console.error("Error formatting date:", e);
      return 'Invalid Date';
    }
  };

  // Helper function to clean description text
  const cleanDescription = (description: string | null): string | null => {
    if (!description) return null;
    // Remove the content reference markers like &#8203;:contentReference[oaicite:0]{index=0}
    return description.replace(/&#8203;:contentReference\[.*?\]\{.*?\}/g, '');
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
        <div className="mt-32 fade-background-rect rounded-lg bg-opacity-90 p-4">

        <span className="content-above mt-32 text-gray-800 text-2xl ">
          Check your eligibility in 60 seconds
        </span>
        </div>
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
            onClick={handleCheckEligibility}
            disabled={isLoading}
            className={`shadow-xl rounded-xl bg-black px-8 py-4 text-lg font-semibold text-white hover:scale-102 transform transition-all duration-300 ease-in-out flex-shrink-0 flex items-center justify-center min-w-[180px] ${isLoading ? 'opacity-90' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Check eligibility'
            )}
          </button>
        </div>

        {/* Text Results Area - Added below the button */}
        <div className="mt-8 w-full max-w-3xl text-left px-4">
          {isLoading && (
            <p className="text-center text-gray-600 animate-pulse">{loadingPhase}</p>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Extraction Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {extractedData && (
            <div className=" fade-background-rect p-6 rounded-lg mb-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-2 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <input
                    type="text"
                    value={extractedData.company_name}
                    onChange={(e) => handleEdit('company_name', e.target.value)}
                    className={`content-above text-xl font-semibold bg-transparent outline-none w-3/5 ${isNotFound(extractedData.company_name) ? 'text-red-600 underline decoration-red-600' : ''}`}
                    placeholder="Company name"
                  />
                  {isNotFound(extractedData.company_name) && <PencilLine className="ml-2 text-red-600" size={20} />}
                  <div className=" flex items-center">
                    {/* Emoji in a separate span */}
                    <span className="content-above text-gray-600">📍</span>
                    <input
                      type="text"
                      value={extractedData.location} // Removed emoji prefix
                      onChange={(e) => handleEdit('location', e.target.value)} // Simplified onChange
                      className={`content-above bg-transparent outline-none text-gray-600 text-right ${isNotFound(extractedData.location) ? 'text-red-600 underline decoration-red-600' : ''}`}
                      placeholder="Location"
                      style={{ width: `${(extractedData.location?.length || 10) * 0.6}em` }} // Dynamic width based on content
                    />
                     {isNotFound(extractedData.location) && <PencilLine className="ml-2 text-red-600" size={16} />}
                  </div>
                </div>
                
                <textarea
                  value={extractedData.mission}
                  onChange={(e) => handleEdit('mission', e.target.value)}
                  className={`content-above w-full bg-transparent outline-none text-gray-700 resize-none mb-0 ${isNotFound(extractedData.mission) ? 'text-red-600 underline decoration-red-600' : ''}`}
                  placeholder="Company mission"
                  // rows={3}
                />
                {isNotFound(extractedData.mission) && <PencilLine className="ml-2 text-red-600 inline-block align-middle" size={16} />}
                
                <div className="flex flex-wrap gap-2 mt-0">
                  {extractedData.tags.map((tag, index) => (
                    <div key={index} className="content-above bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                      {tag}
                    </div>
                  ))}
                </div>
                {/* Add input field for tags */}
                
                {isNotFound(extractedData.tags) && <PencilLine className="ml-2 text-red-600 inline-block align-middle" size={16} />}
              </motion.div>
            </div>
          )}
        </div>
        {/* End Text Results Area */}

        {/* --- Funding Information Section --- */}
        <div className="w-full max-w-3xl text-left">
          {isFundingLoading && (
            <p className="text-center text-gray-600 animate-pulse">Searching for relevant funding...</p>
          )}
          {fundingError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Funding Error: </strong>
              <span className="block sm:inline">{fundingError}</span>
            </div>
          )}
          {fundingItems.length > 0 && (
            <div className="mt-4">
               <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Relevant Funding Opportunities</h2>
               <div className="space-y-4">
                 {fundingItems.map((item) => (
                   <motion.div
                     key={item.id}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.5 }}
                     className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                   >
                     <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title || 'Funding Opportunity'}</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                       <p className="text-gray-600"><span className="font-medium text-gray-700">Amount:</span> {formatAmount(item.amount_min, item.amount_max)}</p>
                       <p className="text-gray-600"><span className="font-medium text-gray-700">Deadline:</span> {formatDate(item.deadline)}</p>
                       <p className="text-gray-600"><span className="font-medium text-gray-700">Region:</span> {item.region || 'N/A'}</p>
                       <p className="text-gray-600"><span className="font-medium text-gray-700">Funding Type:</span> {item.funding_type || 'N/A'}</p>
                     </div>
                     {item.description && <p className="mt-3 text-gray-700 text-sm">{cleanDescription(item.description)}</p>}
                     {item.url && (
                       <a
                         href={item.url}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="mt-3 inline-block text-blue-600 hover:text-blue-800 hover:underline text-sm"
                       >
                         Learn More &rarr;
                       </a>
                     )}
                   </motion.div>
                 ))}
               </div>
            </div>
          )}
           {/* Optional: Message if extraction succeeded but no funding found */}
          {!isFundingLoading && !fundingError && extractedData && fundingItems.length === 0 && (
               <p className="text-center text-gray-600 mt-4">No relevant funding opportunities found based on the extracted data.</p>
          )}
        </div>
        {/* --- End Funding Information Section --- */}

      </div>
    </section>
  );
};

export default HeroSection;