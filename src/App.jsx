import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import JustArrivedPage from './pages/JustArrivedPage'
import BridalCollectionPage from './pages/BridalCollectionPage'
import WishlistPage from './pages/WishlistPage'
import BlogsPage from './pages/BlogsPage'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ScrollToTop from './components/ScrollToTop'
import DiscountPopup from './components/DiscountPopup'
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
            <Route path="/bridal-collection" element={<BridalCollectionPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App