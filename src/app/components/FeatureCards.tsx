import React from 'react';
import Image from 'next/image';

const FeatureCards = () => {
  const cards = [
    {
      title: "REO - ELIGBILITY AI",
      description: "No more paying for second guessing project eligibility, let REO do the heavy lifting.",
      imageUrl: "/backgrounds/bg_pastel_2.png",

    },
    {
      title: "CAIN - DOCUMENTATION PLATFORM",
      description: "Document your R&D projects with ease, connects into your existing tools such as Notion, Google Docs, etc.",
      imageUrl: "/backgrounds/bg_pastel_1.png",

    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {cards.map((card, index) => (
        <div 
          key={index}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-6 pb-0">
            <div className="relative h-128 w-full rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30" />
              <Image
                src={card.imageUrl}
                alt={card.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-medium text-gray-800">{card.title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {card.description}
            </p>
            <div className="mt-6">
              <a 
                href="#" 
                className="inline-flex items-center text-gray-700 hover:text-gray-900"
              >
                Learn more
                <svg 
                  className="ml-2 w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;