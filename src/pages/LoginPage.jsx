import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InputField from '../components/InputField'
import { API_BASE_URL } from '../config/api'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ username: '', mobileNumber: '' })
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, form)
      if (data.success) {
        login(data.user, data.token)
        toast.success('Login successful!')
        if (data.user.role === 'admin') {
          navigate('/admin/dashboard')
        } else {
          navigate('/')
        }
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
        <nav className="text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">Login</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-6 lg:py-12">
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Welcome Back</h1>
              <p className="text-gray-500 text-sm mb-7">Login to continue shopping premium silks</p>

              <form onSubmit={handleSubmit}>
                <InputField
                  label="Username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                />
                <InputField
                  label="Mobile Number"
                  type="tel"
                  name="mobileNumber"
                  placeholder="Enter your 10-digit mobile number"
                  value={form.mobileNumber}
                  onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all hover:scale-[1.02] shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="text-center text-sm text-gray-600 mt-5">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-[#2B4F9E] font-medium hover:underline">Sign up</Link>
                </p>
              </form>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-gradient-to-br from-[#2B4F9E]/10 to-[#f5f1ea] rounded-2xl p-12 text-center">
              <img
                src="https://res.cloudinary.com/dhkljok4i/image/upload/v1772066108/store_ccfg0k.png"
                alt="Vikas Silks"
                className="w-full h-96 object-cover rounded-xl mb-8 shadow-lg"
              />
              <h2 className="text-3xl font-serif font-semibold text-[#2B4F9E] mb-3">Discover Timeless Elegance</h2>
              <p className="text-gray-600">Premium handcrafted silks curated for modern women.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
