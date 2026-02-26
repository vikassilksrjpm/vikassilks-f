import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function BlogCard({ post }) {
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Blog Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Blog Content */}
      <div className="p-6">
        {/* Metadata */}
        <div className="text-xs text-gray-400 uppercase mb-3 tracking-wide">
          {post.categories.join(', ')} | {post.date} | {post.comments} COMMENTS
        </div>

        {/* Title */}
        <h2 className="text-2xl font-serif font-medium text-gray-900 mb-4 leading-tight">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 leading-relaxed mb-6">
          {post.excerpt}
        </p>

        {/* Read More Button */}
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-colors inline-flex items-center gap-2">
          READ MORE
          <span>→</span>
        </button>
      </div>
    </article>
  )
}

export default function BlogsPage() {
  const blogPosts = [
    {
      id: 1,
      title: '5 Must-Have Banarasi Georgette Sarees From Snehalaya Silks...',
      excerpt: 'Discover the timeless elegance of Banarasi Georgette sarees. These exquisite pieces blend traditional craftsmanship with contemporary style, perfect for any special occasion.',
      categories: ['ART SILK SAREE', 'BANARASI SAREE'],
      date: '01-08-2026',
      comments: 0,
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065268/5_must-have_banarasi_georgette_sarees_from_snehalayaa_silks_that_make_great_gifts_ars9k2.png'
    },
    {
      id: 2,
      title: 'The Ultimate Guide to Choosing Your Perfect Bridal Saree',
      excerpt: 'Planning your wedding? Learn how to select the perfect bridal saree that complements your style and makes your special day unforgettable with our expert tips.',
      categories: ['BRIDAL COLLECTION', 'SILK SAREE'],
      date: '28-07-2026',
      comments: 0,
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065268/5_must-have_banarasi_georgette_sarees_from_snehalayaa_silks_that_make_great_gifts_ars9k2.png'
    },
    {
      id: 3,
      title: 'Traditional Kanjivaram Silk: A Heritage Worth Preserving',
      excerpt: 'Explore the rich history and intricate artistry behind Kanjivaram silk sarees. These masterpieces represent centuries of tradition and unparalleled craftsmanship.',
      categories: ['KANJIVARAM', 'PURE SILK'],
      date: '25-07-2026',
      comments: 0,
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065268/5_must-have_banarasi_georgette_sarees_from_snehalayaa_silks_that_make_great_gifts_ars9k2.png'
    },
    {
      id: 4,
      title: 'How to Style Your Saree for Different Occasions',
      excerpt: 'From casual gatherings to grand celebrations, learn the art of styling your saree perfectly for every occasion with our comprehensive styling guide.',
      categories: ['FASHION TIPS', 'STYLING'],
      date: '22-07-2026',
      comments: 0,
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065268/5_must-have_banarasi_georgette_sarees_from_snehalayaa_silks_that_make_great_gifts_ars9k2.png'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <div className="bg-[#faf7f2] py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-2">
            <Link to="/" className="hover:text-gray-800">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">Blogs</span>
          </nav>

          {/* Page Title */}
          <h1 className="text-5xl font-serif font-medium text-gray-900">
            Blogs
          </h1>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}