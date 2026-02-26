import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InputField from '../components/InputField'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    mobileNumber: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData)
      
      if (response.data.success) {
        login(response.data.user, response.data.token)
        toast.success('Login successful!')
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
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
          <span className="text-gray-700">Login</span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
          {/* Left - Login Form */}
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-xl shadow-md p-8 lg:p-10">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 mb-8">
                Login to continue shopping premium silks
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all hover:scale-[1.02] shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-[#2B4F9E] font-medium hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Right - Brand Message */}
          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-[#2B4F9E]/10 to-[#f5f1ea] rounded-2xl p-12 text-center">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop"
                alt="Premium Silk Saree"
                className="w-full h-96 object-cover rounded-xl mb-8 shadow-lg"
              />
              <h2 className="text-3xl font-serif font-semibold text-[#2B4F9E] mb-4">
                Discover Timeless Elegance
              </h2>
              <p className="text-gray-600 text-lg">
                Premium handcrafted silks curated for modern women.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}