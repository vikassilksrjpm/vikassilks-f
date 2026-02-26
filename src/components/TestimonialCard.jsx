export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mx-4 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className="w-5 h-5 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
        
        <p className="text-gray-700 text-center leading-relaxed mb-6 italic">
          "{testimonial.review}"
        </p>
      </div>
      
      <p className="text-[#294B99] font-semibold text-center">
        — {testimonial.name}
      </p>
    </div>
  )
}