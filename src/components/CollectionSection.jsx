import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { redirectToWhatsApp } from '../utils/whatsapp'

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const navigate = useNavigate()

  const handleAddToCart = () => {
    redirectToWhatsApp(product.name, product.price)
  }

  return (
    <div className="group">
      <div className="relative bg-[#FFE5E5] rounded-2xl overflow-hidden mb-4 hover:shadow-xl transition-all duration-300">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-[3/4] object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
          onClick={() => navigate(`/product/${product.id}`)}
        />

        {product.isNew && (
          <span className="absolute top-3 left-3 bg-[#FFB088] text-white text-xs font-medium px-3 py-1 rounded-full">
            New
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsWishlisted(!isWishlisted)
          }}
          className="absolute top-3 right-3 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <svg
            className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.price}</p>
        <button onClick={handleAddToCart} className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default function CollectionSection({ title, products, badge }) {
  return (
    <section className="py-16 px-8 bg-[#FFF7F2]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-12">
          {badge && (
            <span className="bg-[#294B99] text-white px-4 py-1 rounded-full text-sm font-semibold mr-3">
              {badge}
            </span>
          )}
          <h2 className="text-4xl font-medium text-gray-900">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <button className="text-sm font-medium text-gray-800 uppercase tracking-wide hover:text-[#294B99] transition-colors underline underline-offset-4">
            SHOW ALL
          </button>
        </div>
      </div>
    </section>
  )
}