'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.5 }}
          className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-amber-300 mb-6"
        >
          Unlock Your Potential
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto mb-10"
        >
          Dive into a world of knowledge and skills, tailored just for you. Learn anything, anytime, anywhere.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/courses" className="px-10 py-5 text-xl font-bold rounded-full bg-amber-500 text-white hover:bg-amber-600 transition duration-300 ease-in-out shadow-lg hover:shadow-xl">
            Explore Courses
          </Link>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: [0.5, 1, 0.5], 
          y: [0, -20, 0] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        <svg className="w-12 h-12 text-amber-300" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </div>
  )
}
