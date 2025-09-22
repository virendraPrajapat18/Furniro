import React, { useState } from "react";

const ProductDescription = ({image}) => {
  const [activeTab, setActiveTab] = useState("description");

  const content = {
    description: (
      <>
        <p className="mb-4">
          Embodying the raw, wayward spirit of rock 'n' roll, the Kilburn
          portable active stereo speaker takes the unmistakable look and sound
          of Marshall, unplugs the chords, and takes the show on the road.
        </p>
        <p>
          Weighing in under 7 pounds, the Kilburn is a lightweight piece of
          vintage styled engineering. Setting the bar as one of the loudest
          speakers in its class, the Kilburn is a compact, stout-hearted hero
          with a well-balanced audio which boosts a clear midrange and extended
          highs for a sound that is both articulate and pronounced. The analogue
          knobs allow you to fine tune the controls to your personal preferences
          while the guitar-influenced leather strap enables easy and stylish
          travel.
        </p>
      </>
    ),
    additional: (
      <p>
        Additional product information will be displayed here, such as
        dimensions, weight, and specifications. This section provides detailed
        technical data to help users make an informed decision.
      </p>
    ),
    reviews: (
      <p>
        This section will contain customer reviews and ratings for the product.
        Users can see what others think and share their own experiences.
        Currently, there are 5 reviews.
      </p>
    ),
  };

  return (
    <div className="bg-white min-h-screen py-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="flex justify-center items-center space-x-12 mb-8 text-xl font-medium text-gray-500">
          <button
            className={`pb-2 transition-colors duration-200 ${
              activeTab === "description"
                ? "text-black border-b-2 border-black"
                : "hover:text-black"
            }`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`pb-2 transition-colors duration-200 ${
              activeTab === "additional"
                ? "text-black border-b-2 border-black"
                : "hover:text-black"
            }`}
            onClick={() => setActiveTab("additional")}
          >
            Additional Information
          </button>
          <button
            className={`pb-2 transition-colors duration-200 ${
              activeTab === "reviews"
                ? "text-black border-b-2 border-black"
                : "hover:text-black"
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews [5]
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="text-center text-[#9F9F9F] text-base  leading-relaxed mb-16 max-w-[1026px]">
          {content[activeTab]}
        </div>
      </div>

      {/* Image Gallery Section */}
      <div className="flex items-center justify-center">
        <div className="w-[1239px] h-[343px] flex flex-col gap-8 md:flex-row justify-center items-center  ">
          <div className="bg-white h-[348px] w-[605px] ">
            <img
              src={image}
              alt="Product Sofa 1"
              className="h-[348px] w-[605px]"
            />
          </div>
          <div className="bg-white h-[348px] w-[605px]">
            <img
              src={image}
              alt="Product Sofa 2"
              className=" h-[348px] w-[605px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
