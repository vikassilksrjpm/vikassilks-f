import { useState } from 'react'
import QuantitySelector from './QuantitySelector'

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  const [quantity, setQuantity] = useState(item.quantity)

  const handleIncrease = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    onUpdateQuantity(item.id, newQuantity)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  const itemTotal = item.price * quantity

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full sm:w-32 h-40 object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <button
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {item.variant && (
              <p className="text-sm text-gray-500 mb-2">Size: {item.variant}</p>
            )}

            <p className="text-lg font-semibold text-gray-900 mb-4">
              ₹ {item.price.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <QuantitySelector
              quantity={quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-xl font-bold text-gray-900">
                ₹ {itemTotal.toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}