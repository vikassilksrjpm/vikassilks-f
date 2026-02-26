import Header from '../components/Header'
import HeroCarousel from '../components/HeroCarousel'
import ShopByPrice from '../components/ShopByPrice'
import ImageCarousel from '../components/ImageCarousel'
import JustArrived from '../components/JustArrived'
import FeaturedCollection from '../components/FeaturedCollection'
import ShopByCollections from '../components/ShopByCollections'
import CollectionSection from '../components/CollectionSection'
import TestimonialsSection from '../components/TestimonialsSection'
import BlogSection from '../components/BlogSection'
import OurStore from '../components/OurStore'
import Footer from '../components/Footer'

import { getPlaceholder } from '../utils/placeholders'

export default function Home() {
  const kanjivaramProducts = [
    {
      id: 101,
      name: 'Classic Kanjivaram Silk',
      price: '₹12,999',
      image: getPlaceholder(400, 600, 'Kanjivaram Silk', 'FFE5E5'),
      isNew: true
    },
    {
      id: 102,
      name: 'Royal Kanjivaram Weave',
      price: '₹15,499',
      image: getPlaceholder(400, 600, 'Royal Kanjivaram', 'FFF0E5'),
      isNew: true
    },
    {
      id: 103,
      name: 'Traditional Kanjivaram',
      price: '₹13,799',
      image: getPlaceholder(400, 600, 'Traditional', 'FFE0E0'),
      isNew: true
    },
    {
      id: 104,
      name: 'Premium Kanjivaram Silk',
      price: '₹16,999',
      image: getPlaceholder(400, 600, 'Premium Silk', 'FFF5E5'),
      isNew: true
    }
  ]

  const rawSilkProducts = [
    {
      id: 201,
      name: 'Elegant Raw Silk Saree',
      price: '₹8,499',
      image: getPlaceholder(400, 600, 'Raw Silk', 'FFE8E8'),
      isNew: true
    },
    {
      id: 202,
      name: 'Designer Raw Silk',
      price: '₹9,299',
      image: getPlaceholder(400, 600, 'Designer Silk', 'FFF8E5'),
      isNew: true
    },
    {
      id: 203,
      name: 'Handwoven Raw Silk',
      price: '₹7,999',
      image: getPlaceholder(400, 600, 'Handwoven', 'FFE3E3'),
      isNew: true
    },
    {
      id: 204,
      name: 'Luxury Raw Silk Saree',
      price: '₹10,499',
      image: getPlaceholder(400, 600, 'Luxury Silk', 'FFF3E5'),
      isNew: true
    }
  ]

  const kanchiCottonProducts = [
    {
      id: 301,
      name: 'Pure Kanchi Cotton',
      price: '₹4,299',
      image: getPlaceholder(400, 600, 'Kanchi Cotton', 'FFE6E6'),
      isNew: true
    },
    {
      id: 302,
      name: 'Traditional Kanchi Cotton',
      price: '₹3,999',
      image: getPlaceholder(400, 600, 'Traditional Cotton', 'FFF6E5'),
      isNew: true
    },
    {
      id: 303,
      name: 'Handloom Kanchi Cotton',
      price: '₹4,799',
      image: getPlaceholder(400, 600, 'Handloom Cotton', 'FFE4E4'),
      isNew: true
    },
    {
      id: 304,
      name: 'Designer Kanchi Cotton',
      price: '₹5,299',
      image: getPlaceholder(400, 600, 'Designer Cotton', 'FFF4E5'),
      isNew: true
    }
  ]

  return (
    <div className="min-h-screen bg-[#FAF5EF]">
      <Header />
      <HeroCarousel />
      <ShopByPrice />
      <ImageCarousel />
      <JustArrived />
      <FeaturedCollection />
      <ShopByCollections />
      <CollectionSection title="Kanjivaram Silks" products={kanjivaramProducts} badge="New In!" />
      <CollectionSection title="Raw Silk Sarees" products={rawSilkProducts} badge="New In!" />
      <CollectionSection title="Kanchi Cotton Sarees" products={kanchiCottonProducts} badge="New In!" />
      <TestimonialsSection />
      <BlogSection />
      <OurStore />
      <Footer />
    </div>
  )
}