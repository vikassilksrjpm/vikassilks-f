import { useState, useEffect } from 'react'

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    'https://res.cloudinary.com/dhkljok4i/image/upload/v1772063683/Brocade_Kanjivarams_iwowf8.png',
    'https://res.cloudinary.com/dhkljok4i/image/upload/v1772063683/image_6_hmignm.png',
    'https://res.cloudinary.com/dhkljok4i/image/upload/v1772063683/Brocade_Kanjivarams_iwowf8.png',
    'https://res.cloudinary.com/dhkljok4i/image/upload/v1772063683/image_6_hmignm.png',
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [images.length])

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 2)}%)` }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="shrink-0 w-[85%] sm:w-[60%] lg:w-1/2 px-2"
              >
                <div className="h-56 md:h-80 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex ? 'bg-red-600 w-8' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}