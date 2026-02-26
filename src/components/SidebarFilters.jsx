import { useState } from 'react'

export default function SidebarFilters({ isOpen, onClose }) {
  const [expandedSections, setExpandedSections] = useState(['productType'])

  const toggleSection = (section) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const filters = {
    productType: ['Silk', 'Kanjivaram', 'Organza Silk', 'Linen Silk', 'Floral Prints', 'Bridal Collection'],
    fabric: ['Pure Silk', 'Cotton Silk', 'Georgette', 'Chiffon'],
    occasion: ['Wedding', 'Party', 'Casual', 'Festival'],
    color: ['Red', 'Blue', 'Green', 'Pink', 'Yellow', 'Black']
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-20 left-0 h-screen lg:h-auto w-64 bg-white p-6 overflow-y-auto z-30 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h3 className="text-xl font-semibold">Filters</h3>
          <button onClick={onClose} className="text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <h3 className="text-xl font-semibold mb-6 hidden lg:block">Filters</h3>

        {/* Product Type */}
        <div className="border-b pb-4 mb-4">
          <button
            onClick={() => toggleSection('productType')}
            className="flex items-center justify-between w-full text-left font-medium mb-3"
          >
            <span>Product Type</span>
            <svg
              className={`w-5 h-5 transition-transform ${expandedSections.includes('productType') ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('productType') && (
            <div className="space-y-2">
              {filters.productType.map((item, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Fabric */}
        <div className="border-b pb-4 mb-4">
          <button
            onClick={() => toggleSection('fabric')}
            className="flex items-center justify-between w-full text-left font-medium mb-3"
          >
            <span>Fabric</span>
            <svg
              className={`w-5 h-5 transition-transform ${expandedSections.includes('fabric') ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('fabric') && (
            <div className="space-y-2">
              {filters.fabric.map((item, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Occasion */}
        <div className="border-b pb-4 mb-4">
          <button
            onClick={() => toggleSection('occasion')}
            className="flex items-center justify-between w-full text-left font-medium mb-3"
          >
            <span>Occasion</span>
            <svg
              className={`w-5 h-5 transition-transform ${expandedSections.includes('occasion') ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('occasion') && (
            <div className="space-y-2">
              {filters.occasion.map((item, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Color */}
        <div className="pb-4">
          <button
            onClick={() => toggleSection('color')}
            className="flex items-center justify-between w-full text-left font-medium mb-3"
          >
            <span>Color</span>
            <svg
              className={`w-5 h-5 transition-transform ${expandedSections.includes('color') ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedSections.includes('color') && (
            <div className="space-y-2">
              {filters.color.map((item, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}