import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Layout, 
  Presentation, 
  CheckSquare, 
  Users, 
  BarChart, 
  Settings,
  LogOut,
  User,
  X,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const menuItems = [
    { title: 'Overview', icon: Layout, path: '/mentors' },
    { title: 'Courses', icon: Presentation, path: '/mentors/courses' },
    { title: 'Tasks', icon: CheckSquare, path: '/mentors/tasks' },
    { title: 'Students', icon: Users, path: '/mentors/students' },
    { title: 'Analytics', icon: BarChart, path: '/mentors/analytics' },
    { title: 'Settings', icon: Settings, path: '/mentors/settings' },
  ];

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-teal-50"
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-teal-600" />
        ) : (
          <Menu className="h-6 w-6 text-teal-600" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden md:block fixed left-0 top-0 h-screen bg-gradient-to-b from-white to-teal-50 border-r border-teal-100 z-40 w-64"
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-16 flex items-center justify-center border-b border-teal-100"
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
              Cyber Mentor
            </h1>
          </motion.div>
          
          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-3">
            {menuItems.map((item, index) => {
              const isActive = router.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.path}
                    className={`flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-200 
                      ${isActive 
                        ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg shadow-teal-200' 
                        : 'text-gray-600 hover:bg-teal-50 hover:text-teal-600 hover:scale-105'
                      }`}
                  >
                    <Icon className={`h-5 w-5 mr-3 ${
                      isActive ? 'text-white' : 'text-teal-500'
                    }`} />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>
          
          {/* User Profile Section */}
          <div className="border-t border-teal-100 p-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-full flex items-center p-2 rounded-xl hover:bg-teal-50 transition-colors duration-200"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 flex items-center justify-center shadow-md">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="ml-3 flex-1 text-left">
                  <p className="text-sm font-medium text-gray-700">John Doe</p>
                  <p className="text-xs text-teal-600">john@cybermentor.com</p>
                </div>
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-xl shadow-lg py-2 border border-teal-100"
                  >
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="md:hidden fixed left-0 top-0 h-screen bg-gradient-to-b from-white to-teal-50 border-r border-teal-100 z-40 w-[280px]"
          >
            {/* Same content as desktop sidebar */}
            <div className="flex flex-col h-full">
              {/* Logo Section */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="h-16 flex items-center justify-center border-b border-teal-100"
              >
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">
                  Cyber Mentor
                </h1>
              </motion.div>
              
              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto py-6 px-3">
                {menuItems.map((item, index) => {
                  const isActive = router.pathname === item.path;
                  const Icon = item.icon;
                  
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.path}
                        className={`flex items-center px-4 py-3 mb-2 rounded-xl transition-all duration-200 
                          ${isActive 
                            ? 'bg-gradient-to-r from-teal-500 to-teal-400 text-white shadow-lg shadow-teal-200' 
                            : 'text-gray-600 hover:bg-teal-50 hover:text-teal-600 hover:scale-105'
                          }`}
                      >
                        <Icon className={`h-5 w-5 mr-3 ${
                          isActive ? 'text-white' : 'text-teal-500'
                        }`} />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              
              {/* User Profile Section */}
              <div className="border-t border-teal-100 p-4">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                >
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-full flex items-center p-2 rounded-xl hover:bg-teal-50 transition-colors duration-200"
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 flex items-center justify-center shadow-md">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-3 flex-1 text-left">
                      <p className="text-sm font-medium text-gray-700">John Doe</p>
                      <p className="text-xs text-teal-600">john@cybermentor.com</p>
                    </div>
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-xl shadow-lg py-2 border border-teal-100"
                      >
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;