import React from 'react';
import Navbar from '../components/Navbar';

const DemoPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900">Demo Page</h1>
          <p className="mt-4 text-lg text-gray-600">
            Welcome to the demonstration page. Explore the features below.
          </p>
        </div>
      </section>
    </main>
  );
};

export default DemoPage; 