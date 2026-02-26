import { useState, useEffect } from 'react'
import TestimonialCard from './TestimonialCard'

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      review: 'The quality of the silk sarees is exceptional! The colors are vibrant and the fabric feels luxurious. I received so many compliments at the wedding. Highly recommend!'
    },
    {
      id: 2,
      name: 'Anjali Reddy',
      review: 'Beautiful collection and excellent customer service. The saree arrived perfectly packaged and exactly as shown in the pictures. Will definitely shop again!'
    },
    {
      id: 3,
      name: 'Meera Patel',
      review: 'Absolutely love my Kuppadam silk cotton saree! The weave is intricate and the comfort is unmatched. Perfect for long events. Worth every penny!'
    },
    {
      id: 4,
      name: 'Lakshmi Iyer',
      review: 'Stunning designs and authentic traditional sarees. The attention to detail is remarkable. This is now my go-to store for all special occasions!'
    },
    {
      id: 5,
      name: 'Divya Krishnan',
      review: 'The bridal collection is breathtaking! I found my dream wedding saree here. The staff was helpful and the delivery was prompt. Thank you!'
    },
    {
      id: 6,
      name: 'Sneha Gupta',
      review: 'Premium quality at reasonable prices. The silk cotton blend is perfect for our climate. Very satisfied with my purchase and the overall experience!'
    }
  ]

  const itemsPerPage = window.innerWidth >= 1024 ? 3 : 1
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages)
    }, 5000)
    return () => clearInterval(timer)
  }, [totalPages])

  const goToSlide = (index) => setCurrentIndex(index)

  const displayedTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  )

  return (
    <section className="py-16 px-8 bg-[#FAF5EF]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#294B99] mb-12">
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {displayedTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="flex justify-center space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-[#294B99] w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}