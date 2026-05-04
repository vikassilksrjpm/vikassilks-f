import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import JustArrivedPage from './pages/JustArrivedPage'
import WishlistPage from './pages/WishlistPage'
import BlogsPage from './pages/BlogsPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ScrollToTop from './components/ScrollToTop'
import DiscountPopup from './components/DiscountPopup'
import CategoryPage from './pages/CategoryPage'
import AdminDashboard from './pages/AdminDashboard'
import './index.css'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <DiscountPopup />
          <ToastContainer position="top-right" autoClose={3000} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/just-arrived" element={<JustArrivedPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/category/:category/:subcategory" element={<CategoryPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App