
import React from "react";

const BrowseTheRange = () => {
  const categories = [
    {
      name: "Dining",
      imageUrl: "/browseRange/dining.png",
    },
    {
      name: "Living",
      imageUrl: "/browseRange/living.png",
    },
    {
      name: "Bedroom",
      imageUrl: "/browseRange/bedroom.png",
    },
  ];

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold text-gray-800 mb-4">
          Browse The Range
        </h2>
        <p className="text-base sm:text-lg md:text-[20px] text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {categories.map((category) => (
          <div key={category.name} className="flex flex-col items-center">
            {/* Image container */}
            <div className="w-full h-[300px] sm:h-[350px] md:h-[480px] overflow-hidden rounded-lg shadow-md mb-4">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseTheRange;
