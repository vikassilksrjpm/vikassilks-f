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
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false)

  const [userForm, setUserForm] = useState({ username: '', mobileNumber: '' })
  const [adminForm, setAdminForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleUserSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, userForm)
      if (data.success) {
        login(data.user, data.token)
        toast.success('Login successful!')
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleAdminSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/admin/login`, adminForm)
      if (data.success) {
        login(data.user, data.token)
        toast.success('Admin login successful!')
        navigate('/admin/dashboard')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid admin credentials')
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
          <span className="text-gray-700">{isAdmin ? 'Admin Login' : 'Login'}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-6 lg:py-12">
          {/* Form Card */}
          <div className="max-w-md mx-auto w-full">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">

              {/* Toggle Tab */}
              <div className="flex">
                <button
                  onClick={() => setIsAdmin(false)}
                  className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                    !isAdmin
                      ? 'bg-[#2B4F9E] text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  👤 User Login
                </button>
                <button
                  onClick={() => setIsAdmin(true)}
                  className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                    isAdmin
                      ? 'bg-[#1a1a2e] text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  🔐 Admin Login
                </button>
              </div>

              <div className="p-8">
                {!isAdmin ? (
                  /* ── User Login Form ── */
                  <>
                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">Welcome Back</h1>
                    <p className="text-gray-500 text-sm mb-7">Login to continue shopping premium silks</p>

                    <form onSubmit={handleUserSubmit}>
                      <InputField
                        label="Username"
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={userForm.username}
                        onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                      />
                      <InputField
                        label="Mobile Number"
                        type="tel"
                        name="mobileNumber"
                        placeholder="Enter your 10-digit mobile number"
                        value={userForm.mobileNumber}
                        onChange={(e) => setUserForm({ ...userForm, mobileNumber: e.target.value })}
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
                        <Link to="/signup" className="text-[#2B4F9E] font-medium hover:underline">
                          Sign up
                        </Link>
                      </p>
                    </form>
                  </>
                ) : (
                  /* ── Admin Login Form ── */
                  <>
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-10 h-10 bg-[#1a1a2e] rounded-full flex items-center justify-center text-lg">🔐</div>
                      <h1 className="text-2xl font-semibold text-gray-900">Admin Portal</h1>
                    </div>
                    <p className="text-gray-500 text-sm mb-7">Restricted access — authorized personnel only</p>

                    <form onSubmit={handleAdminSubmit}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          placeholder="Enter admin email"
                          value={adminForm.email}
                          onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a2e] transition"
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter admin password"
                            value={adminForm.password}
                            onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a2e] transition pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1a1a2e] hover:bg-[#2d2d4e] text-white font-semibold py-3 rounded-lg transition-all hover:scale-[1.02] shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Verifying...' : 'Login as Admin'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right - Brand Image */}
          <div className="hidden lg:block">
            <div className={`rounded-2xl p-12 text-center transition-all duration-500 ${
              isAdmin
                ? 'bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4e]'
                : 'bg-gradient-to-br from-[#2B4F9E]/10 to-[#f5f1ea]'
            }`}>
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop"
                alt="Vikas Silks"
                className="w-full h-96 object-cover rounded-xl mb-8 shadow-lg"
              />
              {isAdmin ? (
                <>
                  <h2 className="text-3xl font-semibold text-white mb-3">Admin Dashboard</h2>
                  <p className="text-gray-300">Manage products, orders and customers.</p>
                </>
              ) : (
                <>
                  <h2 className="text-3xl font-serif font-semibold text-[#2B4F9E] mb-3">Discover Timeless Elegance</h2>
                  <p className="text-gray-600">Premium handcrafted silks curated for modern women.</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
