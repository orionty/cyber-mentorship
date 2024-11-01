"use client"
import { useState, useEffect } from 'react'
import { BookOpen, Users, Clock, Briefcase, MessageCircle, Award, Home, ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const features = [
  { icon: BookOpen, text: "Expert-led courses" },
  { icon: Users, text: "Interactive learning experiences" },
  { icon: Clock, text: "Self-paced modules" },
  { icon: Home, text: "Offline home tuition" },
  { icon: MessageCircle, text: "Community support" },
  { icon: Award, text: "Certificates of completion" },
]

export const Features = () => {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="py-24 bg-gradient-to-b from-amber-50 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-amber-800 sm:text-5xl text-center mb-16"
        >
          Why Choose Our Platform?
        </motion.h2>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center space-x-4"
            >
              <feature.icon className="h-10 w-10 text-amber-500" />
              <span className="text-xl font-semibold text-gray-800">{feature.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-amber-500 text-white p-3 rounded-full shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50 transition-all duration-300 z-50"
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
