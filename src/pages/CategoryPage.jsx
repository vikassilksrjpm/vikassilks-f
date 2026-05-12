import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { redirectToWhatsApp } from '../utils/whatsapp'
import { API_BASE_URL } from '../config/api'

// Subcategory label map for display names
const subcategoryLabels = {
  'kurtis': 'Kurtis',
  'salwar-suits': 'Salwar Suits / Co-ord Set',
  'tshirts': 'T-Shirts',
  'maternity-wear': 'Maternity Wear',
  'night-wear': 'Night Wear',
  'essentials': 'Essentials',
  'white-shirts': 'Just White Shirts',
  'dhoti-combo': 'Shirt & Dhoti Combo',
  'semi-kanchi': 'Semi Kanchi Silks',
  'art-silk': 'Art Silk',
  'cotton-sarees': 'Cotton Sarees',
}

// All subcategories per category for sidebar
const categorySubs = {
  womens: ['kurtis', 'salwar-suits', 'tshirts', 'maternity-wear', 'night-wear', 'essentials'],
  mens: ['tshirts', 'white-shirts', 'dhoti-combo', 'essentials'],
  sarees: ['semi-kanchi', 'art-silk', 'cotton-sarees'],
}

function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const navigate = useNavigate()
  const formattedPrice = `₹${product.price.toLocaleString('en-IN')}`

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product._id}`)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => { e.stopPropagation(); setIsWishlisted(!isWishlisted) }}
          className="absolute top-3 right-3 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <svg
            className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="p-4 space-y-3">
        <h3
          onClick={() => navigate(`/product/${product._id}`)}
          className="text-sm font-medium text-gray-800 line-clamp-2 cursor-pointer hover:text-[#294B99] transition-colors"
        >
          {product.name}
        </h3>
        <p className="text-base font-semibold text-[#294B99]">{formattedPrice}</p>
        <button
          onClick={() => redirectToWhatsApp(product.name, formattedPrice)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default function CategoryPage() {
  const { category, subcategory } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('default')

  const subcategories = categorySubs[category] || []
  const subcategoryLabel = subcategoryLabels[subcategory] || subcategory

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${API_BASE_URL}/products`, {
          params: { category, subcategory }
        })
        setProducts(data.products)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, subcategory])

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    return 0
  })

  if (!categorySubs[category]) {
    return (
      <div className="min-h-screen bg-[#f5f1ea]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Category not found</h2>
          <Link to="/" className="text-[#294B99] hover:underline">Back to Home</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f1ea]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <span className="capitalize">{category}</span>
          <span>/</span>
          <span className="text-gray-800 font-medium">{subcategoryLabel}</span>
        </nav>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-4 capitalize">{category}</h3>
              <ul className="space-y-1">
                {subcategories.map((sub) => (
                  <li key={sub}>
                    <Link
                      to={`/category/${category}/${sub}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        sub === subcategory
                          ? 'bg-[#294B99] text-white font-medium'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-[#294B99]'
                      }`}
                    >
                      {subcategoryLabels[sub]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{subcategoryLabel}</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {loading ? 'Loading...' : `${products.length} products`}
                </p>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#294B99]"
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Loading skeleton */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                    <div className="aspect-[3/4] bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-9 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-500 text-lg">No products found in this category.</p>
                <Link to="/" className="text-[#294B99] hover:underline mt-2 inline-block">Back to Home</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {sortedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
