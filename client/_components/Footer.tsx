"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Book, Headphones, Users } from 'lucide-react'

export const Footer = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const linkHover = {
    initial: { x: 0 },
    hover: { x: 5, transition: { duration: 0.2 } }
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div {...fadeInUp} className="col-span-1 md:col-span-4 lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4 text-white">FOAK Smart Academy</h3>
            <p className="mb-4">Empowering learners worldwide with cutting-edge online education and professional development opportunities.</p>
            <div className="flex space-x-4">
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
                <Facebook size={20} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Twitter size={20} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
                <Instagram size={20} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-blue-700 transition-colors duration-300">
                <Linkedin size={20} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2 }} href="#" className="text-gray-400 hover:text-red-600 transition-colors duration-300">
                <Youtube size={20} />
              </motion.a>
            </div>
          </motion.div>
          <motion.div {...fadeInUp}>
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center relative">
              <Book className="mr-2" size={18} />
              Learning
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"></span>
            </h3>
            <ul className="space-y-2">
              {['Courses', 'Specializations', 'Certificates', 'Degrees'].map((item, index) => (
                <motion.li key={index} variants={linkHover} whileHover="hover">
                  <Link href={`/${item.toLowerCase()}`} className="hover:text-blue-400 transition-colors duration-300">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeInUp}>
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center relative">
              <Users className="mr-2" size={18} />
              Community
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"></span>
            </h3>
            <ul className="space-y-2">
              {['Learners', 'Partners', 'Developers', 'Beta Testers'].map((item, index) => (
                <motion.li key={index} variants={linkHover} whileHover="hover">
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-400 transition-colors duration-300">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div {...fadeInUp}>
            <h3 className="text-lg font-semibold mb-4 text-white flex items-center relative">
              <Headphones className="mr-2" size={18} />
              Support
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"></span>
            </h3>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'FAQ', 'Accessibility'].map((item, index) => (
                <motion.li key={index} variants={linkHover} whileHover="hover">
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-400 transition-colors duration-300">
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          
        </motion.div>
        <motion.div 
          className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="text-sm text-gray-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} FOAK Smart Academy. All rights reserved.</p>
          <div className="flex space-x-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, index) => (
              <motion.div key={index} whileHover={{ y: -2 }}>
                <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
