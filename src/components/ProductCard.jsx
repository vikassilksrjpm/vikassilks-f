import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { redirectToWhatsApp } from '../utils/whatsapp'

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const navigate = useNavigate()

  const handleProductClick = () => {
    navigate(`/product/${product.id}`)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    redirectToWhatsApp(product.name, product.price)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="relative" onClick={handleProductClick}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-[#294B99] text-white px-2 py-1 text-xs font-semibold rounded">
            New
          </span>
        )}
        
        <button 
          onClick={(e) => {
            e.stopPropagation()
            setIsWishlisted(!isWishlisted)
          }}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <svg 
            className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <div onClick={handleProductClick} className="cursor-pointer">
          <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>
          <p className="text-[#294B99] font-bold text-lg mb-3">{product.price}</p>
        </div>
        <button onClick={handleAddToCart} className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  )
}