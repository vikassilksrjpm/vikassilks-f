import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function WishlistItem({ item }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-4 flex flex-col sm:flex-row gap-6">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full sm:w-32 h-48 sm:h-40 object-cover rounded-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            {item.name}
          </h3>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl font-bold text-red-600">
              ₹ {item.price.toLocaleString('en-IN')}.00
            </span>
            <span className="text-base text-gray-400 line-through">
              ₹ {item.originalPrice.toLocaleString('en-IN')}.00
            </span>
          </div>
        </div>

        <button className="text-sm text-gray-600 hover:text-red-600 underline self-start transition-colors">
          Remove
        </button>
      </div>
    </div>
  )
}

export default function WishlistPage() {
  const wishlistItems = [
    {
      id: 1,
      name: 'Maroon Mangalagiri Silk Cotton Saree with Tanjore Art Print',
      price: 6445,
      originalPrice: 6445,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&h=400&fit=crop'
    },
    {
      id: 2,
      name: 'Elegant Blue Silk Saree with Traditional Border',
      price: 8999,
      originalPrice: 8999,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300&h=400&fit=crop'
    },
    {
      id: 3,
      name: 'Designer Pink Bridal Saree with Embroidery',
      price: 15999,
      originalPrice: 15999,
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=400&fit=crop'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Top Bar */}
      <div className="bg-[#faf7f2] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-gray-800 capitalize">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 capitalize">wishlist</span>
          </nav>

          {/* Page Title */}
          <h1 className="text-4xl md:text-5xl font-serif text-center text-gray-900">
            Wishlist
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlistItems.length > 0 ? (
          <div>
            {wishlistItems.map((item) => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Your wishlist is empty</p>
            <Link
              to="/"
              className="inline-block mt-6 px-8 py-3 bg-[#2B4F9E] text-white rounded-lg hover:bg-[#1a3366] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}