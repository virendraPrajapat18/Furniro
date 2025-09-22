
import React, { useEffect, useState } from "react";

const originalSlides = [
  {
    id: 1,
    image: "/RoomSlider/Room1.png",
    title: "Inner Peace",
    category: "Bed Room",
  },
  {
    id: 2,
    image: "/RoomSlider/Room1.png",
    title: "Minimalist White",
    category: "Dining Room",
  },
  {
    id: 3,
    image: "/RoomSlider/Room1.png",
    title: "Modern Vibe",
    category: "Living Room",
  },
  {
    id: 4,
    image: "/RoomSlider/Room1.png",
    title: "Artistic Feel",
    category: "Studio",
  },
];

const RoomSlider = () => {
  const [transitioning, setTransitioning] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(2);

  // Clone 2 slides at start and end
  const extendedSlides = [
    originalSlides[originalSlides.length - 2],
    originalSlides[originalSlides.length - 1],
    ...originalSlides,
    originalSlides[0],
    originalSlides[1],
  ];

  // Slide width adjusts with screen size
  const getSlideWidth = () => {
    if (window.innerWidth < 640) return 260; // mobile
    if (window.innerWidth < 1024) return 300; // tablet
    return 340; // desktop
  };

  const [slideWidth, setSlideWidth] = useState(getSlideWidth());

  useEffect(() => {
    const handleResize = () => setSlideWidth(getSlideWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= extendedSlides.length - 2) {
      setTransitioning(false);
      setCurrentIndex(2);
    }
    if (currentIndex <= 1) {
      setTransitioning(false);
      setCurrentIndex(extendedSlides.length - 3);
    }
  };

  useEffect(() => {
    if (!transitioning) {
      const timeout = setTimeout(() => setTransitioning(true), 20);
      return () => clearTimeout(timeout);
    }
  }, [transitioning]);

  const currentSlide =
    originalSlides[
      (currentIndex - 2 + originalSlides.length) % originalSlides.length
    ];

  return (
    <div className="flex flex-col md:flex-row pt-8 gap-6 bg-[#fcf9f5] min-h-[500px] md:min-h-[670px] px-4 sm:px-8">
      {/* Left Text */}
      <div className="md:w-1/4 flex flex-col justify-center text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          50+ Beautiful rooms inspiration
        </h2>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Our designer already made a lot of beautiful prototype of rooms that
          inspire you
        </p>
        <button
          onClick={goToNext}
          className="bg-[#c4a04f] text-white font-semibold py-2 px-6 rounded w-fit mx-auto md:mx-0"
        >
          Explore More
        </button>
      </div>

      {/* Right Slider */}
      <div className="md:w-3/4 relative overflow-hidden">
        <div
          className={`flex transition-transform duration-500 ease-in-out ${
            !transitioning ? "transition-none" : ""
          }`}
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${currentIndex * slideWidth}px)`,
          }}
        >
          {extendedSlides.map((slide, index) => {
            const isActive = index === currentIndex;
            const isPrev =
              index === currentIndex - 1 || index === currentIndex + 1;

            // Responsive size classes
            let sizeClass =
              "w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] h-[300px] sm:h-[360px] md:h-[400px] opacity-40";

            if (isActive) {
              sizeClass =
                "w-[260px] sm:w-[320px] md:w-[380px] lg:w-[404px] h-[360px] sm:h-[460px] md:h-[540px] lg:h-[583px] opacity-100";
            } else if (isPrev) {
              sizeClass =
                "w-[240px] sm:w-[300px] md:w-[340px] lg:w-[372px] h-[320px] sm:h-[400px] md:h-[440px] lg:h-[486px] opacity-100";
            }

            return (
              <div
                key={index}
                className={`relative mr-3 flex-shrink-0 rounded-lg overflow-hidden transition-all duration-500 ${sizeClass}`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            );
          })}
        </div>

        {/* Overlay Box */}
        <div className="absolute bottom-4 left-4 sm:left-8 bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-lg w-[180px] sm:w-[217px] h-[100px] sm:h-[130px] shadow-md z-10">
          <p className="text-xs sm:text-sm text-gray-700">
            0{currentSlide.id} — {currentSlide.category}
          </p>
          <h3 className="text-base sm:text-lg font-semibold mt-1 text-gray-900">
            {currentSlide.title}
          </h3>
          <button className="bg-[#c4a04f] text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center mt-2">
            →
          </button>
        </div>

        {/* Arrow */}
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 z-20"
        >
          <img
            src="/RoomSlider/next.png"
            alt="Next"
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
        </button>

        {/* Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {originalSlides.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrentIndex(idx + 2)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${
                (currentIndex - 2 + originalSlides.length) %
                  originalSlides.length ===
                idx
                  ? "bg-[#c4a04f]"
                  : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomSlider;
