import Link from 'next/link'

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: ["Access to 10 courses", "Basic support", "Certificate of completion"],
  },
  {
    name: "Pro",
    price: "$19.99",
    features: ["Access to all courses", "Priority support", "Project reviews", "1-on-1 mentoring"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["Custom course creation", "Dedicated support team", "Advanced analytics", "API access"],
  },
]

export const Pricing = () => {
  return (
    <div className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-12">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="border rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block w-full text-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

