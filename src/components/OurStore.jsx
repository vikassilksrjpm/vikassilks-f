export default function OurStore() {
  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#294B99] mb-12">
          Our Store
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://res.cloudinary.com/dhkljok4i/image/upload/v1772066108/store_ccfg0k.png" 
              alt="Our Store"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Visit our flagship store to experience the finest collection of traditional and contemporary sarees. 
              Our expert staff will help you find the perfect saree for any occasion.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[#294B99] mb-2">Address</h3>
                <p className="text-gray-700">
                  123 Fashion Street, Silk Market<br />
                  Mumbai, Maharashtra 400001
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-[#294B99] mb-2">Business Hours</h3>
                <p className="text-gray-700">
                  Monday - Saturday: 10:00 AM - 8:00 PM<br />
                  Sunday: 11:00 AM - 6:00 PM
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-[#294B99] mb-2">Contact Info</h3>
                <p className="text-gray-700">
                  Phone: +91 98765 43210<br />
                  Email: info@sareeshop.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}