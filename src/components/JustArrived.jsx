import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { redirectToWhatsApp } from '../utils/whatsapp'
import { API_BASE_URL } from '../config/api'

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const navigate = useNavigate()
  const goToProduct = () => navigate(`/product/${product._id}`)

  return (
    <div className="group">
      <div className="relative bg-[#FFE5E5] rounded-2xl overflow-hidden mb-4 hover:shadow-lg transition-all duration-300">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
          onClick={goToProduct}
        />
        <span className="absolute top-3 left-3 bg-[#FFB088] text-white text-xs font-medium px-3 py-1 rounded-full">New</span>
        <button
          onClick={(e) => { e.stopPropagation(); setIsWishlisted(!isWishlisted) }}
          className="absolute top-3 right-3 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <svg className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium text-gray-800 cursor-pointer line-clamp-2" onClick={goToProduct}>{product.name}</h3>
        <p className="text-sm text-gray-500">₹{product.price.toLocaleString('en-IN')}</p>
        <button onClick={() => redirectToWhatsApp(product.name, product.price)} className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-full transition-colors text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-2xl h-72 mb-4" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
        <div className="h-9 bg-gray-200 rounded-full" />
      </div>
    </div>
  )
}

export default function JustArrived() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API_BASE_URL}/products/tag/just-arrived`)
      .then(({ data }) => setProducts(data.products.slice(0, 4)))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-16 px-8 bg-[#FFF7F2]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-medium text-center text-gray-900 mb-12">Just Arrived!</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {loading
            ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
            : products.map(product => <ProductCard key={product._id} product={product} />)
          }
        </div>

        <div className="text-center">
          <Link to="/just-arrived" className="text-sm font-medium text-gray-800 uppercase tracking-wide hover:text-[#294B99] transition-colors underline underline-offset-4">
            SHOW ALL
          </Link>
        </div>
      </div>
    </section>
  )
}
