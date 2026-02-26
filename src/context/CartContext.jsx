import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'
import { toast } from 'react-toastify'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 })
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()

  const API_URL = 'http://localhost:5000/api'

  useEffect(() => {
    if (token) {
      fetchCart()
    }
  }, [token])

  const fetchCart = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCart(data.cart)
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/cart`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCart(data.cart)
      toast.success('Item added to cart')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add item')
    }
  }

  const updateCartItem = async (productId, quantity) => {
    try {
      const { data } = await axios.put(
        `${API_URL}/cart`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCart(data.cart)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update item')
    }
  }

  const removeCartItem = async (productId) => {
    try {
      const { data } = await axios.delete(`${API_URL}/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCart(data.cart)
      toast.success('Item removed from cart')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove item')
    }
  }

  const clearCart = async () => {
    try {
      await axios.delete(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCart({ items: [], totalPrice: 0 })
      toast.success('Cart cleared')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to clear cart')
    }
  }

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateCartItem, removeCartItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}
