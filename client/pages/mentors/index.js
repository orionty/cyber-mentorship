import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { motion } from "framer-motion";
import { User, LogOut, BookOpen, Users, CheckCircle, ListTodo } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    
    const stats = [
      { title: 'Total Courses', value: '12', change: '+2', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
      { title: 'Active Students', value: '148', change: '+12', icon: Users, color: 'from-green-500 to-green-600' },
      { title: 'Completion Rate', value: '87%', change: '+3%', icon: CheckCircle, color: 'from-purple-500 to-purple-600' },
      { title: 'Total Tasks', value: '34', change: '+5', icon: ListTodo, color: 'from-orange-500 to-orange-600' },
    ];

    return (
      <DashboardLayout>
        <div className="grid gap-8 mb-8 px-4 sm:px-6">
          {/* Header with Profile */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Welcome back, Mentor!
              </h2>
              <p className="text-gray-600 mt-2">Here's what's happening with your courses today.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-700">John Doe</p>
                  <p className="text-xs text-gray-500">Senior Mentor</p>
                </div>
              </button>

              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-10"
                >
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                      <div className="mt-1 flex items-baseline">
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <span className="ml-2 text-sm font-medium text-green-600">{stat.change}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    );
  }