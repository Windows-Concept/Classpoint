import React, { useState, useEffect } from 'react';
import SectionSelector from './components/SectionSelector';
import MainDashboard from './components/MainDashboard';
import Widget from './components/Widget';
import { StorageService } from './services/StorageService';

function App() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [timetableData, setTimetableData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWidget, setIsWidget] = useState(false);

  useEffect(() => {
    // Check if running as widget
    const urlParams = new URLSearchParams(window.location.search);
    const widgetMode = urlParams.get('widget') === 'true';
    setIsWidget(widgetMode);

    // Load saved data
    const loadSavedData = async () => {
      try {
        const savedSection = StorageService.getSelectedSection();
        const savedTimetable = StorageService.getTimetableData();
        
        if (savedSection) {
          setSelectedSection(savedSection);
        }
        
        if (savedTimetable) {
          setTimetableData(savedTimetable);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, []);

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    StorageService.saveSelectedSection(section);
  };

  const handleTimetableUpload = (data) => {
    setTimetableData(data);
    StorageService.saveTimetableData(data);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-600 font-medium">Loading ClassPoint...</p>
        </div>
      </div>
    );
  }

  // Widget mode
  if (isWidget) {
    return (
      <Widget 
        selectedSection={selectedSection}
        timetableData={timetableData}
      />
    );
  }

  // Main app mode
  if (!selectedSection) {
    return (
      <SectionSelector 
        onSectionSelect={handleSectionSelect}
      />
    );
  }

  return (
    <MainDashboard
      selectedSection={selectedSection}
      timetableData={timetableData}
      onTimetableUpload={handleTimetableUpload}
      onSectionChange={handleSectionSelect}
    />
  );
}

export default App;