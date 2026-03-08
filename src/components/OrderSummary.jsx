import { useState } from 'react'
import { redirectToWhatsApp } from '../utils/whatsapp'

export default function OrderSummary({ subtotal }) {
  const [couponCode, setCouponCode] = useState('')
  
  const shipping = 0 // Free shipping
  const discount = 0
  const tax = subtotal * 0.18 // 18% GST
  const total = subtotal + shipping - discount + tax

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal</span>
          <span>₹ {subtotal.toLocaleString('en-IN')}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>- ₹ {discount.toLocaleString('en-IN')}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-700">
          <span>Tax (GST 18%)</span>
          <span>₹ {tax.toLocaleString('en-IN')}</span>
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between text-xl font-bold text-gray-900">
            <span>Total</span>
            <span>₹ {total.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Coupon Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Have a coupon code?
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter code"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-[#2B4F9E] text-white rounded-lg hover:bg-[#1a3366] transition-colors font-medium">
            Apply
          </button>
        </div>
      </div>

      {/* Checkout Button */}
      <button onClick={() => redirectToWhatsApp()} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-lg transition-all hover:scale-[1.02] shadow-md">
        Proceed to Checkout
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Secure checkout powered by SSL encryption
      </p>
    </div>
  )
}