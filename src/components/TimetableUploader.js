import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileImage, X, Loader, AlertCircle, CheckCircle, Edit3, Camera } from 'lucide-react';
import { OCRService } from '../services/OCRService';
import ManualTimetableEntry from './ManualTimetableEntry';

const TimetableUploader = ({ onUpload, onCancel, selectedSection }) => {
  const [activeTab, setActiveTab] = useState('ocr');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadedFile(file);
    setIsProcessing(true);
    setError(null);
    setProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const extractedData = await OCRService.extractTimetableData(file, (progressValue) => {
        setProgress(progressValue);
      });

      clearInterval(progressInterval);
      setProgress(100);

      setTimeout(() => {
        onUpload(extractedData);
      }, 500);

    } catch (err) {
      setError(err.message || 'Failed to process timetable image');
      setIsProcessing(false);
      setProgress(0);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    disabled: isProcessing
  });

  const resetUpload = () => {
    setUploadedFile(null);
    setIsProcessing(false);
    setProgress(0);
    setError(null);
  };

  // Handle manual entry save
  const handleManualSave = (timetableData) => {
    onUpload(timetableData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('ocr')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ocr'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Camera className="w-4 h-4 inline mr-2" />
              Upload & Scan
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'manual'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Edit3 className="w-4 h-4 inline mr-2" />
              Manual Entry
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'ocr' ? (
        <div className="max-w-2xl mx-auto">
      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
            ${isDragActive 
              ? 'border-primary-400 bg-primary-50' 
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-primary-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isDragActive ? 'Drop your timetable here' : 'Upload Timetable Image'}
              </h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your timetable image, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports JPG, PNG, and PDF files
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Choose File
              </button>
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Preview */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <FileImage className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{uploadedFile.name}</h4>
                <p className="text-sm text-gray-500">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              {!isProcessing && (
                <button
                  onClick={resetUpload}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Processing Status */}
          {isProcessing && (
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Loader className="w-6 h-6 text-primary-600 animate-spin" />
                <div>
                  <h4 className="font-medium text-gray-900">Processing Timetable</h4>
                  <p className="text-sm text-gray-500">
                    Extracting schedule data using OCR...
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="text-gray-900 font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-900 mb-2">Processing Failed</h4>
                  <p className="text-red-700 mb-4">{error}</p>
                  <div className="flex space-x-3">
                    <button
                      onClick={resetUpload}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Try Again
                    </button>
                    {onCancel && (
                      <button
                        onClick={onCancel}
                        className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {progress === 100 && !error && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="font-medium text-green-900">Processing Complete</h4>
                  <p className="text-green-700">
                    Timetable data extracted successfully!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
        </div>
      ) : (
        <ManualTimetableEntry
          onSave={handleManualSave}
          onCancel={onCancel}
          selectedSection={selectedSection}
        />
      )}
    </div>
  );
};

export default TimetableUploader;