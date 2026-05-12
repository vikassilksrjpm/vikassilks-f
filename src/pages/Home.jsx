import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import HeroCarousel from '../components/HeroCarousel'
import ImageCarousel from '../components/ImageCarousel'
import JustArrived from '../components/JustArrived'
import FeaturedCollection from '../components/FeaturedCollection'
import TestimonialsSection from '../components/TestimonialsSection'
import BlogSection from '../components/BlogSection'
import OurStore from '../components/OurStore'
import Footer from '../components/Footer'
import { API_BASE_URL } from '../config/api'

export default function Home() {

  return (
    <div className="min-h-screen bg-[#FAF5EF]">
      <Header />
      <HeroCarousel />
      <ImageCarousel />
      <JustArrived />
      <FeaturedCollection />
      <TestimonialsSection />
      <BlogSection />
      <OurStore />
      <Footer />
    </div>
  )
}
