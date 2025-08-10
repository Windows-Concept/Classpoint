# ClassPoint

A React-based desktop application for teachers to easily view and track class schedules from scanned or uploaded timetable images.

## Features

- **Section Selection**: Choose from Super 1-3 or Whiz 1-3 sections
- **Timetable Scanner**: Upload timetable images (JPG, PNG, PDF) with OCR text extraction
- **Section Filtering**: Automatically filter schedules for selected section
- **Live Desktop Widget**: Always-on widget showing today's schedule
- **Class Reminders**: 2-minute advance notifications for upcoming classes
- **Clean UI**: Professional blue/white theme with smooth animations

## Tech Stack

- **Frontend**: React 18, TailwindCSS
- **Desktop**: Electron
- **OCR**: Tesseract.js
- **Icons**: Lucide React
- **File Upload**: React Dropzone

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd classpoint
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run electron-dev
```

4. Build for production:
```bash
npm run electron-pack
```

## Development Scripts

- `npm start` - Start React development server
- `npm run electron` - Start Electron app
- `npm run electron-dev` - Start both React and Electron in development mode
- `npm run build` - Build React app for production
- `npm run electron-pack` - Build Electron app for distribution

## Usage

### First Launch
1. Select your section (Super 1-3 or Whiz 1-3)
2. Upload your timetable image
3. The app will extract and filter the schedule for your section

### Main Dashboard
- View current and next class information
- See the complete weekly timetable
- Toggle the desktop widget on/off
- Update timetable or change section

### Desktop Widget
- Always-on-top widget showing today's schedule
- Automatic reminders 2 minutes before classes
- Minimizable and draggable
- Updates in real-time

## File Structure

```
src/
├── components/
│   ├── SectionSelector.js    # Section selection screen
│   ├── MainDashboard.js      # Main application interface
│   ├── TimetableUploader.js  # File upload and OCR processing
│   ├── TimetableDisplay.js   # Schedule display component
│   └── Widget.js             # Desktop widget component
├── services/
│   ├── StorageService.js     # Local storage management
│   ├── OCRService.js         # Text extraction from images
│   └── TimeService.js        # Time and schedule utilities
├── App.js                    # Main application component
├── index.js                  # React entry point
└── index.css                 # Global styles and Tailwind imports
```

## Configuration

### Storage
The app stores data locally using localStorage:
- Selected section
- Timetable data
- Widget position and visibility
- User preferences

### OCR Processing
The OCR service uses Tesseract.js to extract text from uploaded images. The parsing logic can be customized in `OCRService.js` to match your specific timetable format.

### Time Management
The TimeService handles:
- Current/next class detection
- Reminder timing
- Schedule parsing and filtering
- Time calculations and formatting

## Customization

### Adding New Sections
Edit the `SECTIONS` array in `SectionSelector.js`:
```javascript
const SECTIONS = [
  { id: 'new_section', name: 'New Section', color: 'bg-purple-500' },
  // ... existing sections
];
```

### Modifying Reminder Time
Change the reminder time in `Widget.js`:
```javascript
// Check for reminder (change from 2 to desired minutes)
if (next && TimeService.isWithinReminderTime(next.startTime, 5)) {
  // ... reminder logic
}
```

### Customizing OCR Parsing
Modify the `parseExtractedText` method in `OCRService.js` to match your timetable format.

## Building for Distribution

### Windows
```bash
npm run electron-pack
```
This creates a Windows installer in the `dist` folder.

### macOS
```bash
npm run electron-pack
```
Creates a macOS app bundle.

### Linux
```bash
npm run electron-pack
```
Creates an AppImage file.

## Troubleshooting

### OCR Issues
- Ensure timetable images are clear and high-resolution
- Text should be horizontal and well-lit
- PDF support requires additional configuration

### Widget Not Showing
- Check if widget is enabled in main dashboard
- Verify Electron permissions for always-on-top windows
- Try repositioning the widget

### Performance
- Large timetable images may take longer to process
- Consider resizing images before upload for faster OCR
- Widget updates every second - adjust if needed for performance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review existing GitHub issues
3. Create a new issue with detailed information

## Roadmap

- [ ] PDF processing support
- [ ] Multiple timetable formats
- [ ] Export/import functionality
- [ ] Dark theme support
- [ ] Custom notification sounds
- [ ] Schedule sharing features
- [ ] Mobile companion app