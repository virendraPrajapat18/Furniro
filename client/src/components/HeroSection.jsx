
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[80vh] md:h-[716px]">
      {/* Background Image */}
      <img
        src="/hero/bg1.png" // replace with your actual image path
        alt="Hero Background"
        className="w-full h-full object-cover"
      />

      {/* Overlay Container */}
      <div className="absolute inset-0 flex items-center justify-center md:justify-end px-4 md:px-20">
        {/* Card */}
        <div className="bg-[#FFF3E3] p-6 md:p-10 rounded-md shadow-lg max-w-md text-center md:text-left">
          <p className="text-xs md:text-sm text-gray-600 uppercase tracking-wide">
            New Arrival
          </p>
          <h1 className="text-2xl md:text-4xl font-bold text-yellow-700 leading-snug">
            Discover Our <br /> New Collection
          </h1>
          <p className="text-gray-700 mt-4 text-sm md:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis.
          </p>
          <button className="mt-6 px-5 py-2 md:px-6 md:py-3 bg-yellow-700 text-white font-semibold rounded hover:bg-yellow-800 transition">
            BUY NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
