import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { API_BASE_URL } from '../config/api'

const CATEGORIES = ['womens', 'mens', 'sarees']
const SUBCATEGORIES = {
  womens: ['kurtis', 'salwar-suits', 'tshirts', 'maternity-wear', 'night-wear', 'essentials'],
  mens: ['tshirts', 'white-shirts', 'dhoti-combo', 'essentials'],
  sarees: ['semi-kanchi', 'art-silk', 'cotton-sarees'],
}

const emptyProduct = { name: '', description: '', price: '', image: '', category: 'womens', subcategory: 'kurtis', stock: '', tags: [] }

// ── Reusable Modal ────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// ── Confirm Delete Modal ──────────────────────────────────────────────────────
function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="text-4xl mb-4">🗑️</div>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex gap-3 justify-center">
          <button onClick={onCancel} className="px-5 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="px-5 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  )
}

// ── Product Form ──────────────────────────────────────────────────────────────
function ProductForm({ initial, onSubmit, loading, token }) {
  const [form, setForm] = useState(initial)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(initial.image || '')
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const { data } = await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      })
      set('image', data.url)
      setPreview(data.url)
      toast.success('Image uploaded!')
    } catch (e) {
      toast.error('Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form) }} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
        <input value={form.name} onChange={e => set('name', e.target.value)} required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
          <input type="number" value={form.price} onChange={e => set('price', e.target.value)} required min="0"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input type="number" value={form.stock} onChange={e => set('stock', e.target.value)} min="0"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select value={form.category} onChange={e => set('category', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]">
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory *</label>
          <select value={form.subcategory} onChange={e => set('subcategory', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]">
            {(SUBCATEGORIES[form.category] || []).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>

        {/* Upload Button */}
        <label className={`flex items-center justify-center gap-2 w-full border-2 border-dashed rounded-lg px-3 py-4 cursor-pointer transition-colors ${
          uploading ? 'border-gray-200 bg-gray-50' : 'border-[#2B4F9E] hover:bg-blue-50'
        }`}>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
          {uploading ? (
            <span className="text-sm text-gray-400">Uploading...</span>
          ) : (
            <>
              <svg className="w-5 h-5 text-[#2B4F9E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-[#2B4F9E] font-medium">Click to upload image</span>
            </>
          )}
        </label>

        {/* Preview */}
        {preview && (
          <div className="mt-3 relative w-24 h-24">
            <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />
            <button
              type="button"
              onClick={() => { set('image', ''); setPreview('') }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
            >
              x
            </button>
          </div>
        )}

        {/* Manual URL fallback */}
        <input
          value={form.image}
          onChange={e => { set('image', e.target.value); setPreview(e.target.value) }}
          placeholder="Or paste image URL"
          className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
        <div className="flex gap-4">
          {['just-arrived', 'featured'].map(tag => (
            <label key={tag} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={(form.tags || []).includes(tag)}
                onChange={e => {
                  const tags = form.tags || []
                  set('tags', e.target.checked ? [...tags, tag] : tags.filter(t => t !== tag))
                }}
                className="rounded border-gray-300"
              />
              {tag}
            </label>
          ))}
        </div>
      </div>
      <button type="submit" disabled={loading}
        className="w-full bg-[#2B4F9E] hover:bg-[#1a3a7a] text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50">
        {loading ? 'Saving...' : 'Save Product'}
      </button>
    </form>
  )
}

// ── Products Tab ──────────────────────────────────────────────────────────────
function ProductsTab({ token }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeSubcategory, setActiveSubcategory] = useState('all')

  const headers = { Authorization: `Bearer ${token}` }

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${API_BASE_URL}/admin/products`, { headers })
      setProducts(data.products)
    } catch { toast.error('Failed to load products') }
    finally { setLoading(false) }
  }, [token])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  // Reset subcategory when category changes
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setActiveSubcategory('all')
  }

  const handleCreate = async (form) => {
    setSaving(true)
    try {
      await axios.post(`${API_BASE_URL}/admin/products`, form, { headers })
      toast.success('Product created!')
      setModal(null)
      fetchProducts()
    } catch (e) { toast.error(e.response?.data?.message || 'Failed to create') }
    finally { setSaving(false) }
  }

  const handleUpdate = async (form) => {
    setSaving(true)
    try {
      await axios.put(`${API_BASE_URL}/admin/products/${selected._id}`, form, { headers })
      toast.success('Product updated!')
      setModal(null)
      fetchProducts()
    } catch (e) { toast.error(e.response?.data?.message || 'Failed to update') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/admin/products/${confirmId}`, { headers })
      toast.success('Product deleted!')
      setConfirmId(null)
      fetchProducts()
    } catch { toast.error('Failed to delete') }
  }

  // Filter by category → subcategory → search
  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory
    const matchSub = activeSubcategory === 'all' || p.subcategory === activeSubcategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSub && matchSearch
  })

  const currentSubs = activeCategory !== 'all' ? SUBCATEGORIES[activeCategory] || [] : []

  return (
    <div>
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          Products <span className="text-sm font-normal text-gray-400">({filtered.length}/{products.length})</span>
        </h2>
        <div className="flex gap-3">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E] w-44" />
          <button onClick={() => setModal('add')}
            className="bg-[#2B4F9E] hover:bg-[#1a3a7a] text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
            + Add Product
          </button>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeCategory === 'all' ? 'bg-[#2B4F9E] text-white' : 'bg-white text-gray-600 border border-gray-300 hover:border-[#2B4F9E]'
          }`}>
          All
        </button>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              activeCategory === cat ? 'bg-[#2B4F9E] text-white' : 'bg-white text-gray-600 border border-gray-300 hover:border-[#2B4F9E]'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Subcategory filter pills — shown only when a category is selected */}
      {currentSubs.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            onClick={() => setActiveSubcategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              activeSubcategory === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            All {activeCategory}
          </button>
          {currentSubs.map(sub => (
            <button key={sub} onClick={() => setActiveSubcategory(sub)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeSubcategory === sub ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Table with fixed height scroll */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />)}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <div className="overflow-y-auto max-h-[60vh]">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b sticky top-0 z-10">
                  <tr>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium">Product</th>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium hidden md:table-cell">Category / Sub</th>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium hidden sm:table-cell">Price</th>
                    <th className="text-left px-4 py-3 text-gray-600 font-medium hidden lg:table-cell">Stock</th>
                    <th className="text-right px-4 py-3 text-gray-600 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map(p => (
                    <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100 flex-shrink-0" />
                          <span className="font-medium text-gray-800 line-clamp-1">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="capitalize text-gray-600 bg-blue-50 px-2 py-0.5 rounded text-xs">{p.category}</span>
                        <span className="text-gray-400 mx-1">/</span>
                        <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-xs">{p.subcategory}</span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell font-medium text-[#2B4F9E]">₹{p.price?.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          p.stock > 5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => { setSelected(p); setModal('edit') }}
                            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100">Edit</button>
                          <button onClick={() => setConfirmId(p._id)}
                            className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="text-center py-12 text-gray-400">No products found</div>
              )}
            </div>
          </div>
        </div>
      )}

      {modal === 'add' && (
        <Modal title="Add New Product" onClose={() => setModal(null)}>
          <ProductForm initial={emptyProduct} onSubmit={handleCreate} loading={saving} token={token} />
        </Modal>
      )}
      {modal === 'edit' && selected && (
        <Modal title="Edit Product" onClose={() => setModal(null)}>
          <ProductForm initial={selected} onSubmit={handleUpdate} loading={saving} token={token} />
        </Modal>
      )}
      {confirmId && (
        <ConfirmModal
          message="Are you sure you want to delete this product? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  )
}

// ── Users Tab ─────────────────────────────────────────────────────────────────
function UsersTab({ token }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editUser, setEditUser] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  const headers = { Authorization: `Bearer ${token}` }

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`${API_BASE_URL}/admin/users`, { headers })
      setUsers(data.users)
    } catch { toast.error('Failed to load users') }
    finally { setLoading(false) }
  }, [token])

  useEffect(() => { fetchUsers() }, [fetchUsers])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await axios.put(`${API_BASE_URL}/admin/users/${editUser._id}`, editUser, { headers })
      toast.success('User updated!')
      setEditUser(null)
      fetchUsers()
    } catch (e) { toast.error(e.response?.data?.message || 'Failed to update') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/admin/users/${confirmId}`, { headers })
      toast.success('User deleted!')
      setConfirmId(null)
      fetchUsers()
    } catch { toast.error('Failed to delete') }
  }

  const filtered = users.filter(u =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.mobileNumber?.includes(search)
  )

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Users <span className="text-sm font-normal text-gray-400">({users.length})</span></h2>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E] w-48" />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />)}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Username</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium hidden sm:table-cell">Mobile</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium hidden md:table-cell">Joined</th>
                  <th className="text-right px-4 py-3 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(u => (
                  <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#2B4F9E] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {u.username?.[0]?.toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">{u.username}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-600">{u.mobileNumber}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString('en-IN')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => setEditUser({ ...u })}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100">Edit</button>
                        <button onClick={() => setConfirmId(u._id)}
                          className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-400">No users found</div>
            )}
          </div>
        </div>
      )}

      {editUser && (
        <Modal title="Edit User" onClose={() => setEditUser(null)}>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input value={editUser.username} onChange={e => setEditUser({ ...editUser, username: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input value={editUser.mobileNumber} onChange={e => setEditUser({ ...editUser, mobileNumber: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]" />
            </div>
            <button type="submit" disabled={saving}
              className="w-full bg-[#2B4F9E] hover:bg-[#1a3a7a] text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </Modal>
      )}

      {confirmId && (
        <ConfirmModal
          message="Are you sure you want to delete this user? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [showChangeMobile, setShowChangeMobile] = useState(false)
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [mobileForm, setMobileForm] = useState({ newMobileNumber: '', confirmMobileNumber: '' })
  const [pwLoading, setPwLoading] = useState(false)
  const [mobileLoading, setMobileLoading] = useState(false)
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || user.role !== 'admin') navigate('/login')
  }, [user, navigate])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    setPwLoading(true)
    try {
      await axios.put(
        `${API_BASE_URL}/auth/admin/change-password`,
        { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success('Password changed successfully')
      setShowChangePassword(false)
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to change password')
    } finally {
      setPwLoading(false)
    }
  }

  const handleChangeMobile = async (e) => {
    e.preventDefault()
    if (mobileForm.newMobileNumber !== mobileForm.confirmMobileNumber) {
      toast.error('Mobile numbers do not match')
      return
    }
    setMobileLoading(true)
    try {
      await axios.put(
        `${API_BASE_URL}/auth/admin/change-mobile`,
        mobileForm,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success('Mobile number updated successfully')
      setShowChangeMobile(false)
      setMobileForm({ newMobileNumber: '', confirmMobileNumber: '' })
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to update mobile number')
    } finally {
      setMobileLoading(false)
    }
  }

  const navItems = [
    { key: 'products', label: 'Products', icon: '📦' },
    { key: 'users', label: 'Users', icon: '👥' },
  ]

  if (!user || user.role !== 'admin') return null

  return (
    <div className="min-h-screen bg-gray-100 flex h-screen overflow-hidden">
      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#1a1a2e] text-white z-30 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:z-auto lg:flex`}>

        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-white">Vikas Silks</h1>
          <p className="text-xs text-gray-400 mt-1">Admin Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(item => (
            <button key={item.key} onClick={() => { setActiveTab(item.key); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                ${activeTab === item.key ? 'bg-[#2B4F9E] text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Admin info + logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-[#2B4F9E] rounded-full flex items-center justify-center text-sm font-bold">
              {user.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{user.username}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
          <button onClick={() => setShowChangePassword(true)}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors mb-1">
            🔑 Change Password
          </button>
          <button onClick={() => setShowChangeMobile(true)}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors mb-1">
            📱 Change Mobile
          </button>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-lg font-semibold text-gray-800 capitalize">{activeTab}</h2>
          </div>
          <span className="text-sm text-gray-500 hidden sm:block">Welcome, {user.username}</span>
        </header>

        {/* Tab content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {activeTab === 'products' && <ProductsTab token={token} />}
          {activeTab === 'users' && <UsersTab token={token} />}
        </main>
      </div>

      {/* Change Password Modal */}
      {showChangePassword && (
        <Modal title="Change Admin Password" onClose={() => { setShowChangePassword(false); setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' }) }}>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input type="password" value={pwForm.currentPassword}
                onChange={e => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                required placeholder="Enter current password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" value={pwForm.newPassword}
                onChange={e => setPwForm({ ...pwForm, newPassword: e.target.value })}
                required placeholder="Enter new password (min 6 chars)" minLength={6}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input type="password" value={pwForm.confirmPassword}
                onChange={e => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                required placeholder="Confirm new password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]" />
            </div>
            <button type="submit" disabled={pwLoading}
              className="w-full bg-[#2B4F9E] hover:bg-[#1a3a7a] text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50">
              {pwLoading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </Modal>
      )}

      {/* Change Mobile Modal */}
      {showChangeMobile && (
        <Modal title="Change Mobile Number" onClose={() => { setShowChangeMobile(false); setMobileForm({ newMobileNumber: '', confirmMobileNumber: '' }) }}>
          <form onSubmit={handleChangeMobile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Mobile Number</label>
              <input
                type="tel"
                value={mobileForm.newMobileNumber}
                onChange={e => setMobileForm({ ...mobileForm, newMobileNumber: e.target.value })}
                required
                placeholder="Enter new 10-digit mobile number"
                maxLength={10}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Mobile Number</label>
              <input
                type="tel"
                value={mobileForm.confirmMobileNumber}
                onChange={e => setMobileForm({ ...mobileForm, confirmMobileNumber: e.target.value })}
                required
                placeholder="Confirm new mobile number"
                maxLength={10}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B4F9E]"
              />
            </div>
            <button type="submit" disabled={mobileLoading}
              className="w-full bg-[#2B4F9E] hover:bg-[#1a3a7a] text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50">
              {mobileLoading ? 'Updating...' : 'Update Mobile Number'}
            </button>
          </form>
        </Modal>
      )}
    </div>
  )
}
