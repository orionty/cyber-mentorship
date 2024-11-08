export const Testimonials = () => {
  return (
    <div className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-12">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "This platform has transformed my learning experience. The courses are engaging and the instructors are top-notch!"
              </p>
              <div className="font-semibold">John Doe</div>
              <div className="text-sm text-gray-500">Web Developer</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

