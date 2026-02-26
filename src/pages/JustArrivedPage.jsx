import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PriceFilterPills from '../components/PriceFilterPills'
import SidebarFilters from '../components/SidebarFilters'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { getPlaceholder } from '../utils/placeholders'

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { user } = useAuth()

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login')
      return
    }
    addToCart(product.id, 1)
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative bg-[#FFE5E5] overflow-hidden">
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

      <div className="p-4 space-y-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">{product.name}</h3>
        <p className="text-base font-semibold text-gray-900">{product.price}</p>
        <button onClick={handleAddToCart} className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default function JustArrivedPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [sortBy, setSortBy] = useState('featured')

  const products = [
    { id: 1, name: 'Elegant Silk Saree', price: '₹8,999.00', image: getPlaceholder(400, 600, 'Silk+1', 'FFE5E5'), isNew: true },
    { id: 2, name: 'Traditional Cotton Saree', price: '₹3,499.00', image: getPlaceholder(400, 600, 'Cotton+2', 'FFF0E5'), isNew: true },
    { id: 3, name: 'Designer Bridal Saree', price: '₹15,999.00', image: getPlaceholder(400, 600, 'Bridal+3', 'FFE0E0'), isNew: true },
    { id: 4, name: 'Pure Tussar Silk', price: '₹6,799.00', image: getPlaceholder(400, 600, 'Tussar+4', 'FFF5E5'), isNew: true },
    { id: 5, name: 'Handwoven Cotton', price: '₹4,299.00', image: getPlaceholder(400, 600, 'Handwoven+5', 'FFE8E8'), isNew: true },
    { id: 6, name: 'Luxury Silk Collection', price: '₹12,999.00', image: getPlaceholder(400, 600, 'Luxury+6', 'FFF8E5'), isNew: true },
    { id: 7, name: 'Festive Special', price: '₹7,499.00', image: getPlaceholder(400, 600, 'Festive+7', 'FFE3E3'), isNew: true },
    { id: 8, name: 'Classic Elegance', price: '₹9,299.00', image: getPlaceholder(400, 600, 'Classic+8', 'FFF3E5'), isNew: true },
    { id: 9, name: 'Royal Kanjivaram', price: '₹18,999.00', image: getPlaceholder(400, 600, 'Kanjivaram+9', 'FFE6E6'), isNew: true }
  ]

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-medium text-gray-900 mb-3">Just Arrived</h1>
          <p className="text-lg text-gray-600">Discover our latest premium silks</p>
        </div>

        {/* Price Filter Pills */}
        <div className="mb-12">
          <PriceFilterPills />
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <SidebarFilters isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Product Grid Section */}
          <div className="flex-1">
            {/* Sorting Bar */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>

              <div className="flex items-center gap-4 ml-auto">
                <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">New Arrivals</Link>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <button className="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors">
                Load More Products
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}