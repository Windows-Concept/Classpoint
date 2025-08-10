import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Calendar, 
  Clock, 
  Settings, 
  Eye, 
  EyeOff,
  RefreshCw,
  BookOpen,
  MapPin,
  Cloud
} from 'lucide-react';
import TimetableUploader from './TimetableUploader';
import SettingsModal from './SettingsModal';
import { TimeService } from '../services/TimeService';
import { NotificationService } from '../services/NotificationService';
import { StorageService } from '../services/StorageService';
import { generateDemoTimetable } from '../utils/DemoData';

const MainDashboard = ({ 
  selectedSection, 
  timetableData, 
  onTimetableUpload, 
  onSectionChange 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUploader, setShowUploader] = useState(!timetableData);
  const [widgetVisible, setWidgetVisible] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [nextClass, setNextClass] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(StorageService.getSettings());
  const [lastReminderTime, setLastReminderTime] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timetableData && selectedSection) {
      const todaySchedule = TimeService.getTodaySchedule(timetableData, selectedSection.id);
      const current = TimeService.getCurrentClass(todaySchedule);
      const next = TimeService.getNextClass(todaySchedule);
      
      setCurrentClass(current);
      setNextClass(next);

      // Check for reminders
      if (next && settings.notifications && TimeService.isWithinReminderTime(next.startTime, settings.reminderTime)) {
        const reminderKey = `${next.subject}-${next.startTime}`;
        if (lastReminderTime !== reminderKey) {
          setLastReminderTime(reminderKey);
          if (settings.soundEnabled) {
            NotificationService.showReminderWithChime(next);
          } else {
            NotificationService.showClassReminder(next);
          }
        }
      }
    }
  }, [timetableData, selectedSection, currentTime, settings, lastReminderTime]);

  const handleTimetableUpload = (data) => {
    onTimetableUpload(data);
    setShowUploader(false);
  };

  const handleDemoData = () => {
    const demoData = generateDemoTimetable();
    onTimetableUpload(demoData);
    NotificationService.showScheduleUpdate('Demo timetable loaded successfully!');
  };

  const toggleWidget = () => {
    if (window.require) {
      const { ipcRenderer } = window.require('electron');
      if (widgetVisible) {
        ipcRenderer.invoke('hide-widget');
      } else {
        ipcRenderer.invoke('show-widget');
      }
      setWidgetVisible(!widgetVisible);
    }
  };

  const openQuickdrop = () => {
    if (window.require) {
      const { shell } = window.require('electron');
      shell.openExternal('https://quickdrop-drab.vercel.app/');
    } else {
      // Fallback for web version
      window.open('https://quickdrop-drab.vercel.app/', '_blank');
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">ClassPoint</h1>
                <p className="text-sm text-gray-500">{selectedSection.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{formatTime(currentTime)}</p>
                <p className="text-xs text-gray-500">{formatDate(currentTime)}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={openQuickdrop}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
                  title="Open Quickdrop - File Sharing App"
                >
                  <Cloud className="w-4 h-4" />
                  <span>Quickdrop</span>
                </button>
                
                <button
                  onClick={toggleWidget}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title={widgetVisible ? 'Hide Widget' : 'Show Widget'}
                >
                  {widgetVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Current Class Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary-600" />
                Current Class
              </h3>
              {currentClass && (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Live
                </span>
              )}
            </div>
            
            {currentClass ? (
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{currentClass.subject}</p>
                  <p className="text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {currentClass.location || 'Classroom'}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {currentClass.startTime} - {currentClass.endTime}
                  </span>
                  <span className="text-primary-600 font-medium">
                    {TimeService.getTimeRemaining(currentClass.endTime)} remaining
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No class currently scheduled</p>
              </div>
            )}
          </div>

          {/* Next Class Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 text-primary-600" />
                Next Class
              </h3>
              {nextClass && TimeService.isWithinReminderTime(nextClass.startTime) && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full animate-pulse-soft">
                  Soon
                </span>
              )}
            </div>
            
            {nextClass ? (
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{nextClass.subject}</p>
                  <p className="text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {nextClass.location || 'Classroom'}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {nextClass.startTime} - {nextClass.endTime}
                  </span>
                  <span className="text-primary-600 font-medium">
                    in {TimeService.getTimeUntil(nextClass.startTime)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No upcoming classes today</p>
              </div>
            )}
          </div>
        </div>

        {/* Timetable Management */}
        {showUploader && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Timetable Management
              </h2>
            </div>
            <div className="p-6">
              <TimetableUploader
                onUpload={handleTimetableUpload}
                onCancel={() => setShowUploader(false)}
                selectedSection={selectedSection}
              />
            </div>
          </div>
        )}

        {/* Timetable Actions */}
        {!showUploader && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="text-center">
              <div className="flex justify-center space-x-4">
                {timetableData && (
                  <button
                    onClick={() => setShowUploader(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Edit Timetable</span>
                  </button>
                )}
                {!timetableData && (
                  <button
                    onClick={() => setShowUploader(true)}
                    className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Create Timetable</span>
                  </button>
                )}
                <button
                  onClick={handleDemoData}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Load Demo</span>
                </button>
              </div>
              {!timetableData && (
                <div className="mt-6">
                  <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Timetable Created
                  </h3>
                  <p className="text-gray-500">
                    Create your timetable using OCR scanning or manual entry to start tracking your classes
                  </p>
                </div>
              )}
              {timetableData && (
                <div className="mt-6">
                  <Calendar className="w-16 h-16 text-primary-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Timetable Ready
                  </h3>
                  <p className="text-gray-500">
                    Your schedule is active and tracking your classes. Use the widget or check the current/next class cards above.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSettingsChange={(newSettings) => {
          setSettings(newSettings);
        }}
        selectedSection={selectedSection}
        onSectionChange={onSectionChange}
      />
    </div>
  );
};

export default MainDashboard;