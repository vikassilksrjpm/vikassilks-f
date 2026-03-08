import { redirectToWhatsApp } from '../utils/whatsapp'

function BannerCard() {
  return (
    <div className="bg-gradient-to-br from-[#E8D5C4] to-[#D4B896] rounded-2xl shadow-lg overflow-hidden h-full flex">
      <div className="w-2/5 relative">
        <img
          src="https://res.cloudinary.com/dhkljok4i/image/upload/v1772064493/image_32_md2lvh.png"
          alt="Model wearing saree"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-3/5 flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-[#4A3428] mb-1">Vikas Silks</h3>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#4A3428] mb-1">
            Kuppadam Silk Cotton
          </h2>
          <p className="text-2xl font-medium text-[#4A3428]">Sarees</p>
        </div>

        <button onClick={() => redirectToWhatsApp()} className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-md">
          View Collection
        </button>
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1">
      <div className="p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover rounded-lg mb-4"
        />
        <h3 className="text-sm font-normal text-gray-800 mb-2 line-clamp-2 text-left">
          {product.name}
        </h3>
        <p className="text-purple-600 font-semibold text-base text-left">
          ₹ {product.price.toLocaleString('en-IN')}.00
        </p>
      </div>
    </div>
  )
}

export default function FeaturedCollection() {
  const products = [
    {
      id: 1,
      name: 'Traditional Kuppadam Silk Cotton',
      price: 5999,
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772064493/image_32_md2lvh.png'
    },
    {
      id: 2,
      name: 'Elegant Kuppadam Weave',
      price: 7499,
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772064493/image_32_md2lvh.png'
    },
    {
      id: 3,
      name: 'Premium Silk Cotton Blend',
      price: 6799,
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772064493/image_32_md2lvh.png'
    }
  ]

  return (
    <section className="py-16 px-8 bg-[#FFF8F1]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left - Promotional Banner */}
          <div className="min-h-[400px]">
            <BannerCard />
          </div>

          {/* Right - Product Cards */}
          <div className="flex items-center">
            <div className="w-full overflow-x-auto">
              <div className="flex lg:grid lg:grid-cols-3 gap-4 pb-4 snap-x snap-mandatory">
                {products.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-64 lg:w-auto snap-center">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}