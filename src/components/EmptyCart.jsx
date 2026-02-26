import { Link } from 'react-router-dom'

export default function EmptyCart() {
  return (
    <div className="bg-white rounded-lg shadow-md p-12 text-center">
      <div className="flex justify-center mb-6">
        <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-3">Your cart is empty</h2>
      <p className="text-gray-600 mb-8">
        Looks like you haven't added any items to your cart yet.
      </p>

      <Link
        to="/"
        className="inline-block px-8 py-3 bg-[#2B4F9E] text-white rounded-lg hover:bg-[#1a3366] transition-colors font-medium"
      >
        Continue Shopping
      </Link>
    </div>
  )
}