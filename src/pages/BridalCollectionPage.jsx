import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { redirectToWhatsApp } from '../utils/whatsapp'

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const navigate = useNavigate()

  const handleAddToCart = () => {
    redirectToWhatsApp(product.name, product.price)
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
          <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded">
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
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">{product.name}</h3>
        <p className="text-lg font-bold text-gray-900">{product.price}</p>
        <button onClick={handleAddToCart} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors uppercase text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default function BridalCollectionPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const products = [
    { id: 101, name: 'Royal Bridal Silk Saree with Zari Work', price: '₹25,999', image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065610/image_18_qmlc28.png', isNew: true },
    { id: 102, name: 'Traditional Red Bridal Kanjivaram', price: '₹32,999', image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065610/image_18_qmlc28.png', isNew: true },
    { id: 103, name: 'Designer Bridal Silk with Heavy Embroidery', price: '₹45,999', image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065610/image_18_qmlc28.png', isNew: false },
    { id: 104, name: 'Golden Bridal Saree with Stone Work', price: '₹38,999', image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065610/image_18_qmlc28.png', isNew: true },
    { id: 105, name: 'Maroon Bridal Silk Cotton Blend', price: '₹28,999', image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065610/image_18_qmlc28.png', isNew: false },
    { id: 106, name: 'Pink Bridal Designer Collection', price: '₹42,999', image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065610/image_18_qmlc28.png', isNew: true },
    { id: 107, name: 'Green Bridal Silk with Gold Border', price: '₹35,999', image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065610/image_18_qmlc28.png', isNew: false },
    { id: 108, name: 'Orange Bridal Kanjivaram Special', price: '₹29,999', image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065610/image_18_qmlc28.png', isNew: true }
  ]

  const priceRanges = [
    'Under ₹10k',
    '₹10k - ₹20k',
    '₹20k - ₹30k',
    '₹30k - ₹40k',
    'Above ₹40k'
  ]

  const categories = [
    { name: 'ART SILK', count: 25 },
    { name: 'CHIFFON', count: 12 },
    { name: 'KANJIVARAM', count: 45 },
    { name: 'ORGANZA SILK', count: 18 },
    { name: 'PURE SILK', count: 38 },
    { name: 'BANARASI', count: 22 },
    { name: 'DESIGNER', count: 30 }
  ]

  return (
    <div className="min-h-screen bg-orange-50/30">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Bridal Collection</span>
        </nav>

        {/* Page Hero */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-serif font-medium text-gray-900 mb-6">Bridal Collection</h1>
          
          {/* Price Bubbles */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {priceRanges.map((range, index) => (
              <button
                key={index}
                className="px-6 py-3 bg-[#2e4a85] text-white rounded-full font-medium hover:bg-[#1e3a75] transition-colors"
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className={`lg:w-1/4 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg p-6 shadow-md sticky top-24">
              <h3 className="text-xl font-bold mb-6">Filter:</h3>

              {/* Price Range */}
              <div className="mb-6 pb-6 border-b">
                <h4 className="font-semibold mb-4">Price Range</h4>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-semibold mb-4">Categories</h4>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {categories.map((category, index) => (
                    <label key={index} className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded">
                      <div className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">{category.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">({category.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid Section */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>

              <div className="flex items-center gap-4 ml-auto">
                <div className="flex gap-2">
                  <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}