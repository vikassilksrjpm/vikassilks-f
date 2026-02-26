export default function BlogCard({ blog }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <img 
        src={blog.image} 
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {blog.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {blog.description}
        </p>
        <a 
          href="#" 
          className="text-[#294B99] font-semibold hover:text-blue-800 transition-colors"
        >
          Read More →
        </a>
      </div>
    </div>
  )
}