import { useState, useEffect } from 'react'

export default function DiscountPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    const lastShown = localStorage.getItem('popupLastShown')
    const now = Date.now()
    
    if (!lastShown || now - parseInt(lastShown) > 60000) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem('popupLastShown', now.toString())
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => setIsOpen(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Discount claimed:', { username, phone })
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[480px] p-8 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close popup"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo Section */}
        <div className="text-center mb-6">
          <img
            src="https://res.cloudinary.com/dhkljok4i/image/upload/v1771076871/VIKAS_LOGO_1_t9hkmb.png"
            alt="Logo"
            className="h-16 mx-auto"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-3 uppercase tracking-tight leading-tight">
          GET 5% OFF ON YOUR FIRST PURCHASE
        </h2>

        {/* Subheading */}
        <p className="text-gray-500 text-center mb-8 text-sm">
          Sign up and unlock your instant discount.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            required
          />

          {/* Phone Input */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-xl">🇮🇳</span>
              <span className="text-gray-600 text-sm">+91</span>
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{10}"
              className="w-full pl-20 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Claim discount
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-gray-900 underline transition-colors"
          >
            Follow us on Instagram
          </a>
        </div>
      </div>
    </div>
  )
}
