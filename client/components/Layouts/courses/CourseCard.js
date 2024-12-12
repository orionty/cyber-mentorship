// components/courses/CourseCard.js
import { MoreVertical, Users, Clock, Edit2, Trash2 } from 'lucide-react';
import { useState, useRef } from 'react';
import { useClickAway } from 'react-use';
import Image from 'next/image';

const CourseCard = ({ course, viewMode, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  
  useClickAway(menuRef, () => setShowMenu(false));

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="flex items-center p-4">
          <Image
            src={course.thumbnail}
            alt={course.title}
            className="w-48 h-32 object-cover rounded-lg"
          />
          <div className="ml-6 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                <p className="text-gray-600 mt-1 line-clamp-2">{course.description}</p>
              </div>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
                {showMenu && <CourseMenuDropdown onEdit={onEdit} onDelete={onDelete} />}
              </div>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center text-gray-600">
                <Users className="w-5 h-5 mr-2" />
                {course.totalStudents} Students
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                {course.duration}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                course.status === 'active' 
                  ? 'bg-teal-100 text-teal-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="relative">
        <Image
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            {showMenu && <CourseMenuDropdown onEdit={onEdit} onDelete={onDelete} />}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            course.status === 'active' 
              ? 'bg-teal-100 text-teal-800' 
              : 'bg-amber-100 text-amber-800'
          }`}>
            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
          </span>
          <span className="text-sm text-gray-600">{course.level}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2" />
            {course.totalStudents} Students
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            {course.duration}
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseMenuDropdown = ({ onEdit, onDelete }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1">
      <button
        onClick={onEdit}
        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center"
      >
        <Edit2 className="w-4 h-4 mr-2" />
        Edit Course
      </button>
      <button
        onClick={onDelete}
        className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50 flex items-center"
      >
        <Trash2 className="w-4 h-4 mr-2" />
        Delete Course
      </button>
    </div>
  );
};

export default CourseCard;

