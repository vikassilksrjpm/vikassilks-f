import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  return (
    <nav className="bg-[#FAF5EF] px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="mx-2">/</span>}
              {index === items.length - 1 ? (
                <span className="text-gray-800">{item.name}</span>
              ) : (
                <Link to={item.href} className="hover:text-[#294B99] transition-colors">
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  )
}