import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { redirectToWhatsApp } from '../utils/whatsapp'
import { API_BASE_URL } from '../config/api'

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative bg-[#FFE5E5] overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product._id}`)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-[#FFB088] text-white text-xs font-medium px-3 py-1 rounded-full">New</span>
        <button
          onClick={(e) => { e.stopPropagation(); setIsWishlisted(!isWishlisted) }}
          className="absolute top-3 right-3 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <svg className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="p-4 space-y-3">
        <h3 onClick={() => navigate(`/product/${product._id}`)} className="text-sm font-medium text-gray-800 line-clamp-2 cursor-pointer hover:text-[#294B99]">{product.name}</h3>
        <p className="text-base font-semibold text-[#294B99]">₹{product.price.toLocaleString('en-IN')}</p>
        <button
          onClick={() => redirectToWhatsApp(product.name, `₹${product.price.toLocaleString('en-IN')}`)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-9 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

export default function JustArrivedPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/products/tag/just-arrived`)
        setProducts(data.products)
      } catch (error) {
        console.error('Failed to fetch just arrived products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    return 0
  })

  return (
    <div className="min-h-screen bg-[#f5f1ea]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Just Arrived</span>
        </nav>

        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-medium text-gray-900 mb-3">Just Arrived</h1>
          <p className="text-lg text-gray-600">Discover our latest premium collection</p>
        </div>

        {/* Sort + Count Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {loading ? 'Loading...' : `${products.length} products`}
          </p>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#294B99]"
          >
            <option value="default">Sort by: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {loading
            ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
            : sorted.map(product => <ProductCard key={product._id} product={product} />)
          }
        </div>

        {!loading && sorted.length === 0 && (
          <div className="text-center py-20 text-gray-400">No products found.</div>
        )}
      </div>

      <Footer />
    </div>
  )
}
