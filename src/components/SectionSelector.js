import React, { useState } from 'react';
import { GraduationCap, ChevronRight } from 'lucide-react';

const SECTIONS = [
  { id: 'super1', name: 'Super 1', color: 'bg-blue-500' },
  { id: 'super2', name: 'Super 2', color: 'bg-indigo-500' },
  { id: 'super3', name: 'Super 3', color: 'bg-purple-500' },
  { id: 'whiz1', name: 'Whiz 1', color: 'bg-green-500' },
  { id: 'whiz2', name: 'Whiz 2', color: 'bg-teal-500' },
  { id: 'whiz3', name: 'Whiz 3', color: 'bg-cyan-500' },
];

const SectionSelector = ({ onSectionSelect }) => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setIsAnimating(true);
    
    setTimeout(() => {
      onSectionSelect(section);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary-600 p-4 rounded-full shadow-lg">
              <GraduationCap className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to ClassPoint
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto">
            Select your section to get started with tracking your class schedule
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up">
          {SECTIONS.map((section, index) => (
            <div
              key={section.id}
              className={`
                relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                ${selectedSection?.id === section.id ? 'ring-4 ring-primary-400 scale-105' : ''}
                ${isAnimating && selectedSection?.id === section.id ? 'animate-pulse-soft' : ''}
              `}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleSectionClick(section)}
            >
              <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center shadow-sm`}>
                      <span className="text-white font-bold text-lg">
                        {section.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {section.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Class Section
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 animate-fade-in">
          <p className="text-sm text-gray-500">
            Your selection will be saved for future sessions
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionSelector;