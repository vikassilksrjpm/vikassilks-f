import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { redirectToWhatsApp } from '../utils/whatsapp'
import { API_BASE_URL } from '../config/api'

function ImageGallery({ images, name }) {
  const [active, setActive] = useState(0)
  const imgs = images?.length ? images : ['https://placehold.co/600x800/FFE5E5/8B4513?text=No+Image']

  return (
    <div className="space-y-4">
      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
        <img src={imgs[active]} alt={name} className="w-full h-full object-cover" />
      </div>
      {imgs.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {imgs.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                active === i ? 'border-[#294B99]' : 'border-transparent'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function SkeletonDetail() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
      <div className="aspect-[3/4] bg-gray-200 rounded-2xl" />
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
      </div>
    </div>
  )
}

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`${API_BASE_URL}/products/${id}`)
        setProduct(data.product)
        if (data.product.sizes?.length > 0) setSelectedSize(data.product.sizes[0])
        if (data.product.colors?.length > 0) setSelectedColor(data.product.colors[0])
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  const handleWhatsApp = () => {
    redirectToWhatsApp(
      product.name,
      `₹${product.price.toLocaleString('en-IN')}`,
      quantity,
      selectedSize || null,
      selectedColor || null,
      product.image || null
    )
  }

  if (loading) return (
    <div className="min-h-screen bg-[#FAF5EF]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10"><SkeletonDetail /></div>
      <Footer />
    </div>
  )

  if (error || !product) return (
    <div className="min-h-screen bg-[#FAF5EF]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500 text-lg mb-4">Product not found.</p>
        <Link to="/" className="text-[#294B99] hover:underline">Back to Home</Link>
      </div>
      <Footer />
    </div>
  )

  const images = product.image ? [product.image] : []

  return (
    <div className="min-h-screen bg-[#FAF5EF]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-gray-800 line-clamp-1">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — Image Gallery */}
          <ImageGallery images={images} name={product.name} />

          {/* Right — Product Info */}
          <div className="space-y-6">
            {/* Name & Price */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 leading-snug">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-[#294B99]">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
            </div>

            {/* Stock */}
            <div>
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium text-sm">
                  ✓ In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-500 font-medium text-sm">Out of Stock</span>
              )}
              {product.stock > 0 && product.stock <= 5 && (
                <div className="mt-2 bg-red-50 border-l-4 border-red-500 p-3 rounded">
                  <p className="text-red-700 text-sm font-semibold">
                    Only {product.stock} left — order soon!
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Size Selector */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Size</h3>
              {product.sizes?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-[#294B99] bg-[#294B99] text-white'
                          : 'border-gray-300 text-gray-700 hover:border-[#294B99]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={selectedSize}
                  onChange={e => setSelectedSize(e.target.value)}
                  placeholder="Enter your size (e.g. S, M, L, Free Size)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#294B99]"
                />
              )}
            </div>

            {/* Color Selector */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Color</h3>
              {product.colors?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedColor === color
                          ? 'border-[#294B99] bg-[#294B99] text-white'
                          : 'border-gray-300 text-gray-700 hover:border-[#294B99]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  value={selectedColor}
                  onChange={e => setSelectedColor(e.target.value)}
                  placeholder="Enter your preferred color (e.g. Red, Blue)"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#294B99]"
                />
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Quantity</span>
              <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors text-lg font-bold"
                >−</button>
                <span className="px-4 py-2 font-semibold min-w-[2.5rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors text-lg font-bold"
                  disabled={quantity >= product.stock}
                >+</button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => handleWhatsApp('buy')}
                disabled={product.stock === 0}
                className="w-full bg-[#294B99] hover:bg-blue-800 text-white py-3.5 px-6 rounded-xl font-semibold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                Buy It Now
              </button>
              <button
                onClick={() => handleWhatsApp('cart')}
                disabled={product.stock === 0}
                className="w-full border-2 border-[#294B99] text-[#294B99] py-3.5 px-6 rounded-xl font-semibold hover:bg-[#294B99] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>

            {/* Meta */}
            <div className="border-t pt-4 space-y-2 text-sm text-gray-500">
              <p><span className="font-medium text-gray-700">Category:</span> <span className="capitalize">{product.category}</span></p>
              <p><span className="font-medium text-gray-700">Type:</span> <span className="capitalize">{product.subcategory?.replace(/-/g, ' ')}</span></p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
