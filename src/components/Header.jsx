import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
    setUserDropdownOpen(false)
  }

  const menuItems = [
    { name: 'JUST ARRIVED', link: '/just-arrived' },
    { name: 'BRIDAL COLLECTION', link: '/bridal-collection' },
    { name: 'SILK', hasDropdown: true },
    { name: 'COTTON', hasDropdown: true },
    { name: 'SILK COTTON', hasDropdown: true },
    { name: 'TUSSARS', hasDropdown: true },
    { name: 'LINENS', link: '/' },
    { name: 'FANCY', hasDropdown: true },
    { name: 'DESIGNER', link: '/' },
    { name: 'BLOGS', link: '/blogs' }
  ]

  return (
    <header className="sticky top-0 z-50 bg-[#254A99] shadow-md">
      {/* Main Navbar */}
      <div className="px-4 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
          {/* Left - Search */}
          <div className="flex items-center space-x-2 text-white cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden md:inline text-sm">Search</span>
          </div>

          {/* Center - Logo */}
          <div className="flex justify-center">
            <Link to="/">
              <img 
                src="https://res.cloudinary.com/dhkljok4i/image/upload/v1771076871/VIKAS_LOGO_1_t9hkmb.png" 
                alt="SareeShop" 
                className="h-16 md:h-20 w-auto"
              />
            </Link>
          </div>

          {/* Right - Icons */}
          <div className="flex items-center justify-end space-x-4 md:space-x-6 text-white">
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-medium">{user.username}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="hidden md:block hover:text-blue-200 transition-colors">
                <Link to="/login">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              </button>
            )}

            <button className="hidden md:block hover:text-blue-200 transition-colors">
              <Link to="/wishlist">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
            </button>

            <button className="relative hover:text-blue-200 transition-colors">
              <Link to="/cart">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.items.length}
                  </span>
                )}
              </Link>
            </button>

            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Menu Bar - Desktop */}
      <nav className="hidden md:block bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center space-x-8 py-3">
            {menuItems.map((item, index) => (
              <li key={index} className="relative group">
                {item.hasDropdown ? (
                  <button className="flex items-center space-x-1 text-sm font-medium text-[#5D4037] hover:text-[#254A99] transition-colors">
                    <span>{item.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                ) : (
                  <Link 
                    to={item.link} 
                    className="text-sm font-medium text-[#5D4037] hover:text-[#254A99] transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#254A99] group-hover:w-full transition-all duration-300"></div>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-slideDown">
          <ul className="py-4">
            {menuItems.map((item, index) => (
              <li key={index} className="border-b border-gray-100">
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-[#5D4037] hover:bg-gray-50"
                    >
                      <span>{item.name}</span>
                      <svg 
                        className={`w-4 h-4 transition-transform ${openDropdown === index ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openDropdown === index && (
                      <div className="bg-gray-50 px-6 py-2">
                        <a href="#" className="block py-2 text-sm text-gray-600">Option 1</a>
                        <a href="#" className="block py-2 text-sm text-gray-600">Option 2</a>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.link}
                    className="block px-6 py-3 text-sm font-medium text-[#5D4037] hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}