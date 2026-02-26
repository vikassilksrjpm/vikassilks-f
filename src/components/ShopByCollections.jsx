function CollectionCard({ collection }) {
  return (
    <div className="relative flex-shrink-0 w-72 h-96 rounded-2xl overflow-hidden shadow-lg cursor-pointer group">
      <img
        src={collection.image}
        alt={collection.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      
      <div className="absolute bottom-6 left-6">
        <p className="text-white text-lg font-semibold">{collection.name}</p>
      </div>
    </div>
  )
}

export default function ShopByCollections() {
  const collections = [
    {
      name: 'Linen Sarees',
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772064921/Designer_Sarees_jrilf2.png'
    },
    {
      name: 'Designer Sarees',
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772064921/Designer_Sarees_jrilf2.png'
    },
    {
      name: 'Semi Ikat Sarees',
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772064921/Designer_Sarees_jrilf2.png'
    },
    {
      name: 'Kanchi Silk Cotton',
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772064921/Designer_Sarees_jrilf2.png'
    },
    {
      name: 'Bridal Silk',
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772064921/Designer_Sarees_jrilf2.png'
    },
    {
      name: 'Cotton Sarees',
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772064921/Designer_Sarees_jrilf2.png'
    },
    {
      name: 'Pure Silk',
      image: 'https://res.cloudinary.com/dhkljok4i/image/upload/v1772064921/Designer_Sarees_jrilf2.png'
    }
  ]

  return (
    <section className="py-16 px-8 bg-[#FFF8F2]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-normal text-center text-gray-800 mb-12">
          Shop By Collection
        </h2>
        
        <div className="overflow-x-auto elegant-scroll">
          <div className="flex gap-6 w-max">
            {collections.map((collection, index) => (
              <CollectionCard key={index} collection={collection} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}