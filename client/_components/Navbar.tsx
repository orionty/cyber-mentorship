"use client";

import Link from 'next/link'
import { useState, useEffect } from 'react';
import { Menu, X, BookOpen, Users, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <>
      <nav className={`bg-gradient-to-r from-amber-50 to-amber-100 shadow-lg ${isScrolled ? 'fixed top-0 left-0 right-0 z-50' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image src="/logo.svg" alt="Logo" width={120} height={40} />
              </Link>
            </div>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/courses" className="text-amber-800 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center">
                <BookOpen className="w-5 h-5 mr-1" />
                Courses
              </Link>
              <Link href="/about" className="text-amber-800 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center">
                <Users className="w-5 h-5 mr-1" />
                About
              </Link>
              <Link href="/contact" className="text-amber-800 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center">
                <MessageCircle className="w-5 h-5 mr-1" />
                Contact
              </Link>
              {user ? (
                <>
                  <Link href="/dashboard" className="text-amber-800 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-amber-800 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <button className="text-amber-800 hover:text-amber-600 px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out border border-amber-600 hover:bg-amber-600 hover:text-white">
                      Log in
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="bg-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition duration-300 ease-in-out transform hover:scale-105">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-amber-600 hover:text-amber-500 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition duration-300 ease-in-out"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-amber-50">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/courses" className="text-amber-800 hover:bg-amber-200 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">
                <BookOpen className="w-5 h-5 inline-block mr-2" />
                Courses
              </Link>
              <Link href="/about" className="text-amber-800 hover:bg-amber-200 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">
                <Users className="w-5 h-5 inline-block mr-2" />
                About
              </Link>
              <Link href="/contact" className="text-amber-800 hover:bg-amber-200 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">
                <MessageCircle className="w-5 h-5 inline-block mr-2" />
                Contact
              </Link>
              {user ? (
                <>
                  <Link href="/dashboard" className="text-amber-800 hover:bg-amber-200 block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-amber-800 hover:bg-amber-200 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <button className="text-amber-800 hover:bg-amber-200 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out">
                      Log in
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="bg-amber-600 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-amber-700 transition duration-300 ease-in-out">
                      Sign up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 to-amber-600"
        style={{ scaleX, transformOrigin: "0%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </>
  )
}