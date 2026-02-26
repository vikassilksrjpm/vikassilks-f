import { useState } from 'react'

export default function PriceFilterPills() {
  const [activeFilter, setActiveFilter] = useState(null)

  const priceRanges = [
    'Under ₹3000',
    '₹3000 - ₹5000',
    '₹5000 - ₹7000',
    '₹7000 - ₹10000',
    'Above ₹10000'
  ]

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 justify-center min-w-max px-4">
        {priceRanges.map((range, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(index)}
            className={`px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap ${
              activeFilter === index
                ? 'bg-[#1a3366] text-white'
                : 'bg-[#2B4F9E] text-white hover:bg-[#1a3366]'
            }`}
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  )
}