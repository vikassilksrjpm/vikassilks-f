import { useState, useEffect } from 'react'
import { redirectToWhatsApp } from '../utils/whatsapp'

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772062031/world-saree-day-copy-space-background_1_khlwo9.png',
      title: 'Timeless Silk Elegance',
      subtitle: 'Handwoven Heritage Collection'
    },
    {
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772062031/world-saree-day-copy-space-background_1_khlwo9.png',
      title: 'Bridal Luxury Redefined',
      subtitle: 'Exquisite Craftsmanship'
    },
    {
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772062031/world-saree-day-copy-space-background_1_khlwo9.png',
      title: 'Designer Silk Collection',
      subtitle: 'Where Tradition Meets Modernity'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative h-[85vh] md:h-[75vh] overflow-hidden">
      <div 
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="shrink-0 w-full h-full"
          >
            {/* Full Background Image */}
            <div className="relative w-full h-full">
              <img 
                src={slide.image} 
                alt="Luxury silk saree" 
                className="w-full h-full object-cover object-center"
              />
              
              {/* Overlay on Right Half */}
              <div className="absolute inset-0 flex items-center justify-end">
                <div className="w-full md:w-1/2 h-full flex items-center justify-center px-6 md:px-12 lg:px-16">
                  <div className="text-center max-w-xl">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight tracking-wide drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-gray-900/90 mb-4 md:mb-6 tracking-wider drop-shadow-md">
                      {slide.subtitle}
                    </p>
                    <button onClick={() => redirectToWhatsApp()} className="w-full md:w-auto bg-red-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base font-medium hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-lg">
                      Explore Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-gray-900/90 hover:text-gray-900 p-2 md:p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-gray-900/90 hover:text-gray-900 p-2 md:p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-red-600 w-8 md:w-10' 
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}