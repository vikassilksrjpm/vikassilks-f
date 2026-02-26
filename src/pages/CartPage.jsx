import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'
import EmptyCart from '../components/EmptyCart'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function CartPage() {
  const { cart, loading, updateCartItem, removeCartItem } = useCart()
  const { user } = useAuth()

  const handleRemoveItem = (productId) => {
    removeCartItem(productId)
  }

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateCartItem(productId, newQuantity)
  }

  const calculateSubtotal = () => {
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const recommendedProducts = [
    {
      id: 101,
      name: 'Pure Tussar Silk',
      price: '₹6,799.00',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop&sat=-50',
      isNew: true
    },
    {
      id: 102,
      name: 'Handwoven Cotton',
      price: '₹4,299.00',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop&hue=30',
      isNew: true
    },
    {
      id: 103,
      name: 'Luxury Silk Collection',
      price: '₹12,999.00',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop&hue=30',
      isNew: false
    },
    {
      id: 104,
      name: 'Festive Special',
      price: '₹7,499.00',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop&hue=60',
      isNew: true
    }
  ]

  return (
    <div className="min-h-screen bg-[#f5f1ea]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Cart</span>
        </nav>

        {/* Page Title */}
        <h1 className="text-4xl font-semibold text-center text-gray-900 mb-12">
          Shopping Cart
        </h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2B4F9E]"></div>
          </div>
        ) : !user ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Please login to view your cart</h2>
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-[#2B4F9E] text-white rounded-lg hover:bg-[#1a3366] transition-colors font-medium"
            >
              Login
            </Link>
          </div>
        ) : cart.items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* Main Cart Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cart.items.map((item) => (
                  <CartItem
                    key={item.product._id}
                    item={{
                      id: item.product._id,
                      name: item.product.name,
                      price: item.product.price,
                      quantity: item.quantity,
                      image: item.product.image,
                      variant: 'One Size'
                    }}
                    onRemove={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary subtotal={calculateSubtotal()} />
              </div>
            </div>

            {/* Recommended Products */}
            <div className="mt-16">
              <h2 className="text-3xl font-semibold text-center text-gray-900 mb-8">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
                    <div className="relative bg-[#FFE5E5] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isNew && (
                        <span className="absolute top-3 left-3 bg-[#FFB088] text-white text-xs font-medium px-3 py-1 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-sm font-medium text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}