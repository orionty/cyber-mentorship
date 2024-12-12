// components/course/CourseViewer.js
import { useState } from 'react';
import { Play, Lock, CheckCircle, XCircle, ExternalLink } from 'lucide-react';

const CourseViewer = ({ course, currentChapter }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`w-80 bg-white border-r border-gray-200 flex flex-col ${
        isMenuOpen ? 'block' : 'hidden'
      }`}>
        {/* Course Title */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">{course.title}</h1>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="relative pt-1">
            <div className="h-2 bg-emerald-600 rounded-full" style={{ width: `${course.progress}%` }} />
          </div>
          <p className="mt-2 text-sm text-emerald-600 font-medium">
            {course.progress}% Completed
          </p>
        </div>

        {/* Chapter List */}
        <div className="flex-1 overflow-y-auto">
          {course.chapters.map((chapter) => (
            <div
              key={chapter.id}
              className={`flex items-center px-6 py-3 hover:bg-gray-50 ${
                chapter.id === currentChapter?.id ? 'border-l-4 border-emerald-600 bg-emerald-50' : ''
              }`}
            >
              <div className="mr-3">
                {chapter.isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                ) : chapter.isLocked ? (
                  <Lock className="w-5 h-5 text-gray-400" />
                ) : (
                  <Play className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <span className={`text-sm ${
                chapter.isLocked ? 'text-gray-400' : 'text-gray-700'
              }`}>
                {chapter.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
            ≡
          </button>
          <div className="flex items-center space-x-4">
            {currentChapter?.isCompleted ? (
              <span className="flex items-center text-sm text-emerald-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                Completed
              </span>
            ) : (
              <span className="flex items-center text-sm text-gray-600">
                <XCircle className="w-4 h-4 mr-1" />
                Not Completed
              </span>
            )}
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <ExternalLink className="w-5 h-5 mr-1" />
              Exit
            </button>
          </div>
        </header>

        {/* Chapter Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentChapter?.isLocked ? (
            <ChapterLocked price={course.price} />
          ) : (
            <>
              {/* Video Player */}
              <div className="aspect-video bg-black rounded-lg mb-6">
                {currentChapter?.videoUrl ? (
                  <video
                    controls
                    className="w-full h-full"
                    src={currentChapter.videoUrl}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    No video available
                  </div>
                )}
              </div>

              {/* Chapter Info */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentChapter?.title}
                </h2>
                <div className="prose max-w-none">
                  {currentChapter?.description}
                </div>

                {/* Attachments */}
                {currentChapter?.attachments?.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Course Attachments</h3>
                    <div className="space-y-2">
                      {currentChapter.attachments.map((attachment, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-sky-50 text-sky-700 rounded-lg"
                        >
                          <a
                            href={attachment.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm hover:underline"
                          >
                            {attachment.url}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ChapterLocked = ({ price }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="bg-gray-900 p-16 rounded-lg text-center">
      <Lock className="w-16 h-16 text-white mx-auto mb-4" />
      <h2 className="text-xl font-bold text-white mb-2">
        This chapter is Locked!
      </h2>
      <button className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-lg font-medium">
        Enroll for ${price}
      </button>
    </div>
  </div>
);

export default CourseViewer;