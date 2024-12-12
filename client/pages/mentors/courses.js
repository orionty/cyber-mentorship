import { useState } from 'react';
import { Plus, Search, Filter, Grid, List } from 'lucide-react';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import CourseCard from '@/components/Layouts/courses/CourseCard';
import CourseModal from '@/components/Layouts/courses/CourseModal';

export default function CoursesPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Advanced Cybersecurity Fundamentals",
      description: "Learn the core principles of cybersecurity including network security, encryption, and threat analysis.",
      thumbnail: "/api/placeholder/400/250",
      duration: "8 weeks",
      totalStudents: 45,
      level: "Intermediate",
      progress: 85,
      status: "active"
    },
    // Add more sample courses...
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Courses Management</h1>
            <p className="text-gray-600 mt-1">Create and manage your cyber security courses</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-teal-600 hover:bg-teal-700 
                     text-white rounded-lg shadow-sm transition-colors duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Course
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-sm text-teal-600' 
                      : 'text-gray-600 hover:text-teal-600'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-sm text-teal-600' 
                      : 'text-gray-600 hover:text-teal-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              <button className="inline-flex items-center px-4 py-2 text-gray-700 
                               bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className={`grid ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'grid-cols-1 gap-4'
        }`}>
          {courses.map((course) => (
            <CourseCard 
              key={course.id}
              course={course}
              viewMode={viewMode}
              onEdit={() => {/* Handle edit */}}
              onDelete={() => {/* Handle delete */}}
            />
          ))}
        </div>
      </div>

      {/* Course Modal */}
      <CourseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </DashboardLayout>
  );
}