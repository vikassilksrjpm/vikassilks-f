export default function ProductMeta({ product }) {
  const infoItems = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      text: 'Free shipping on orders above ₹999'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: 'Need help? Call us at +91 98765 43210'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      text: 'Secured & safe payments'
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      text: 'Origin – Made in India'
    }
  ]

  return (
    <div className="space-y-6 border-t pt-6">
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Vendor:</span>
          <span className="font-semibold">{product.vendor}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Type:</span>
          <span className="font-semibold">{product.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">SKU:</span>
          <span className="font-semibold">{product.sku}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Availability:</span>
          <span className="font-semibold text-green-600">Available</span>
        </div>
      </div>

      <div className="border-t pt-6">
        <p className="text-gray-700 leading-relaxed mb-6">
          {product.description}
        </p>

        <div className="space-y-4">
          {infoItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 text-gray-700">
              <div className="text-[#294B99]">{item.icon}</div>
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}