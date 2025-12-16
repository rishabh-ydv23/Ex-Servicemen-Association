import { useState, useEffect } from 'react';

const slides = [
  {
    id: 1,
    image: '/branches/army.jpg',
    title: 'Indian Army Veterans',
    description: 'Serving with honor on land, protecting our borders and communities'
  },
  {
    id: 2,
    image: '/branches/airforce.jpg',
    title: 'Indian Air Force Veterans',
    description: 'Guarding our skies with courage and dedication'
  },
  {
    id: 3,
    image: '/branches/navy.jpg',
    title: 'Indian Navy Veterans',
    description: 'Protecting our maritime interests with pride and valor'
  }
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white rounded-xl shadow-medium border border-gray-200">
      <div className="relative overflow-hidden rounded-lg">
        {/* Slides */}
        <div className="relative h-64 sm:h-72 md:h-80 lg:h-96">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Image */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center bg-gradient-to-br from-navy to-navyDark text-white">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif mb-3">
                    {slide.title}
                  </h3>
                  <p className="text-base sm:text-lg text-white/90 mb-4">
                    {slide.description}
                  </p>
                  <div className="mt-4">
                    <button className="btn-secondary px-4 py-2 text-sm sm:text-base">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={goToNextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}