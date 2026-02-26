export default function ShopByPrice() {
  const priceRanges = [
    'Under ₹3,000',
    'Under ₹5,000',
    '₹5,000 – ₹10,000',
    '₹15,000 – ₹20,000',
    '₹20,000 – ₹25,000'
  ]

  return (
    <section className="py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#294B99] mb-12">
          Shop by Price
        </h2>
        
        <div className="flex flex-wrap justify-center gap-8">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              className="w-48 h-48 rounded-full bg-[#294B99] border-2 border-[#294B99] flex items-center justify-center text-white font-semibold text-lg hover:bg-white hover:text-[#294B99] hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {range}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}