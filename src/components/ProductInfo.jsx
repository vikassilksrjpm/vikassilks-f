import { useState } from 'react'
import { redirectToWhatsApp } from '../utils/whatsapp'

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleBuyNow = () => {
    redirectToWhatsApp(product.name, `₹${product.price.toLocaleString()}.00`, quantity)
  }

  const handleAddToCart = () => {
    redirectToWhatsApp(product.name, `₹${product.price.toLocaleString()}.00`, quantity)
  }

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {product.name}
        </h1>
        
        <div className="text-3xl font-bold text-[#294B99] mb-2">
          ₹ {product.price.toLocaleString()}.00
        </div>
        
        <div className="text-green-600 font-semibold mb-2">
          {product.stock} Available
        </div>
        
        {product.stock <= 5 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
            <p className="text-red-700 text-sm font-semibold">
              Hurry, {product.stock} item(s) left in stock!
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 font-medium">Quantity:</span>
          <div className="flex items-center border border-gray-300 rounded-full">
            <button
              onClick={decreaseQuantity}
              className="p-2 hover:bg-gray-100 rounded-l-full transition-colors"
              disabled={quantity <= 1}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="px-4 py-2 font-semibold">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="p-2 hover:bg-gray-100 rounded-r-full transition-colors"
              disabled={quantity >= product.stock}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <button onClick={handleBuyNow} className="w-full bg-[#294B99] text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-800 transition-colors">
            Buy It Now
          </button>
          
          <button onClick={handleAddToCart} className="w-full border-2 border-[#294B99] text-[#294B99] py-3 px-6 rounded-md font-semibold hover:bg-[#294B99] hover:text-white transition-colors">
            Add to Cart
          </button>
          
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-md font-semibold transition-colors ${
              isWishlisted 
                ? 'bg-red-50 text-red-600 border border-red-200' 
                : 'text-gray-600 hover:text-[#294B99]'
            }`}
          >
            <svg 
              className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{isWishlisted ? 'Added to Wishlist' : 'Add To Wishlist'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}