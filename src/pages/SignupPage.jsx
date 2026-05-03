import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InputField from '../components/InputField'
import { API_BASE_URL } from '../config/api'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    mobileNumber: '',
    confirmMobileNumber: '',
    agreeToTerms: false
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.agreeToTerms) {
      toast.error('Please agree to Terms & Conditions')
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData)
      
      if (response.data.success) {
        toast.success('Signup successful! Please login.')
        navigate('/login')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f1ea]">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Create Account</span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
          {/* Left - Signup Form */}
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-xl shadow-md p-8 lg:p-10">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-600 mb-8">
                Join us and explore exclusive collections
              </p>

              <form onSubmit={handleSubmit}>
                <InputField
                  label="Username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                />

                <InputField
                  label="Mobile Number"
                  type="tel"
                  name="mobileNumber"
                  placeholder="Enter your mobile number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />

                <InputField
                  label="Confirm Mobile Number"
                  type="tel"
                  name="confirmMobileNumber"
                  placeholder="Confirm your mobile number"
                  value={formData.confirmMobileNumber}
                  onChange={handleChange}
                />

                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-[#2B4F9E] border-gray-300 rounded focus:ring-[#2B4F9E]"
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the{' '}
                      <Link to="/terms" className="text-[#2B4F9E] hover:underline">
                        Terms & Conditions
                      </Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="text-[#2B4F9E] hover:underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all hover:scale-[1.02] shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-[#2B4F9E] font-medium hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Right - Brand Message */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-[#2B4F9E]/10 to-[#f5f1ea] rounded-2xl p-12 text-center">
              <img
                src="https://res.cloudinary.com/dhkljok4i/image/upload/v1772066108/store_ccfg0k.png"
                alt="Premium Silk Collection"
                className="w-full h-96 object-cover rounded-xl mb-8 shadow-lg"
              />
              <h2 className="text-3xl font-serif font-semibold text-[#2B4F9E] mb-4">
                Join Our Exclusive Community
              </h2>
              <p className="text-gray-600 text-lg">
                Get access to exclusive collections, early sales, and personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}