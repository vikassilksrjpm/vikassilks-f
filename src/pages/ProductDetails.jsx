import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'
import ProductGallery from '../components/ProductGallery'
import ProductInfo from '../components/ProductInfo'
import ProductMeta from '../components/ProductMeta'
import RelatedProducts from '../components/RelatedProducts'
import Footer from '../components/Footer'

export default function ProductDetails() {
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Navy Blue Mangalagiri Silk Cotton Saree with Tanjore Art Print', href: '#' }
  ]

  const product = {
    name: 'Navy Blue Mangalagiri Silk Cotton Saree with Tanjore Art Print',
    price: 6445,
    stock: 1,
    vendor: 'Vikas',
    type: 'Mangalagiri Silk Cotton',
    sku: 'SS137351',
    description: 'This exquisite Navy Blue Mangalagiri Silk Cotton Saree features traditional Tanjore art print, combining the elegance of silk with the comfort of cotton. Perfect for special occasions and cultural celebrations.',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=800&fit=crop'
    ]
  }

  const relatedProducts = [
    {
      id: 1,
      name: 'Red Silk Saree',
      price: '₹7,999',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
      isNew: false
    },
    {
      id: 2,
      name: 'Green Cotton Saree',
      price: '₹4,299',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop',
      isNew: true
    },
    {
      id: 3,
      name: 'Golden Bridal Saree',
      price: '₹18,999',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=400&fit=crop',
      isNew: false
    },
    {
      id: 4,
      name: 'Pink Designer Saree',
      price: '₹9,799',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop',
      isNew: true
    }
  ]

  return (
    <div className="min-h-screen bg-[#FAF5EF]">
      <Header />
      <Breadcrumb items={breadcrumbItems} />
      
      <main className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <ProductGallery images={product.images} />
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-lg p-6">
            <ProductInfo product={product} />
            <ProductMeta product={product} />
          </div>
        </div>
      </main>

      <RelatedProducts products={relatedProducts} />
      <Footer />
    </div>
  )
}