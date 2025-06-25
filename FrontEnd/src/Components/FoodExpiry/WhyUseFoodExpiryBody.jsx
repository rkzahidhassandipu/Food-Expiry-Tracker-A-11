import React from 'react'
import { FaBell, FaRecycle, FaAppleAlt } from 'react-icons/fa';
const features = [
    {
      icon: <FaBell size={24} className="text-blue-500 dark:text-blue-400" />,
      title: "Smart Tracking",
      description: "Easily log your groceries and receive automatic expiry reminders, so you never forget about items in your fridge or pantry again."
    },
    {
      icon: <FaRecycle size={24} className="text-green-500 dark:text-green-400" />,
      title: "Reduce Waste",
      description: "Cut down on food spoilage and save money by using what you have before it goes bad."
    },
    {
      icon: <FaAppleAlt size={24} className="text-purple-500 dark:text-purple-400" />,
      title: "Eat Healthier",
      description: "Focus on fresh ingredients to create nutritious, delicious meals every day."
    }
  ];

const WhyUseFoodExpiryBody = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
  )
}

export default WhyUseFoodExpiryBody
