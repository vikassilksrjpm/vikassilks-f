import BlogCard from './BlogCard'

export default function BlogSection() {
  const blogs = [
    {
      id: 1,
      title: 'The Art of Draping: Traditional Styles Explained',
      description: 'Discover the rich heritage behind different saree draping styles from across India. Learn about regional variations and their cultural significance.',
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065268/5_must-have_banarasi_georgette_sarees_from_snehalayaa_silks_that_make_great_gifts_ars9k2.png'
    },
    {
      id: 2,
      title: 'Caring for Your Silk Sarees: A Complete Guide',
      description: 'Essential tips and tricks to maintain the beauty and longevity of your precious silk sarees. From storage to cleaning, we cover it all.',
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065268/5_must-have_banarasi_georgette_sarees_from_snehalayaa_silks_that_make_great_gifts_ars9k2.png'
    },
    {
      id: 3,
      title: 'Bridal Saree Trends: What\'s Hot This Season',
      description: 'Stay updated with the latest bridal saree trends. From colors to embellishments, find out what modern brides are choosing.',
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772065268/5_must-have_banarasi_georgette_sarees_from_snehalayaa_silks_that_make_great_gifts_ars9k2.png'
    }
  ]

  return (
    <section className="py-16 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#294B99] mb-12">
          From Our Blog
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  )
}