# ClassPoint Installation Guide

## 🚀 Quick Start Options

### Option 1: Download Pre-built Executable (Recommended)
1. Go to [Releases](https://github.com/Windows-Concept/ClassPoint/releases)
2. Download the latest installer or portable version
3. Run the installer or extract and run the portable version

### Option 2: Install from Source Code

#### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional) - [Download here](https://git-scm.com/)

#### Installation Steps

1. **Download the source code**:
   ```bash
   # Option A: Clone from GitHub
   git clone https://github.com/Windows-Concept/ClassPoint.git
   cd ClassPoint
   
   # Option B: Download and extract the source code zip
   # Extract ClassPoint-Source-Code.zip and navigate to the folder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   # For development (with hot reload)
   npm run electron-dev
   
   # Or build and run production version
   npm run build
   npm run electron
   ```

4. **Build your own executable** (optional):
   ```bash
   # Build for Windows
   npm run electron-pack-win
   
   # Build for all platforms
   npm run electron-pack-all
   ```

#### Build Output Locations
- **Windows Installer**: `dist/ClassPoint Setup 1.0.0.exe`
- **Windows Portable**: `dist/ClassPoint-Portable.zip`
- **Unpacked Files**: `dist/win-unpacked/ClassPoint.exe`

## 🛠️ Development

### Available Scripts
- `npm start` - Start React development server
- `npm run electron-dev` - Start app in development mode
- `npm run build` - Build React app for production
- `npm run electron-pack` - Build executable for current platform
- `npm test` - Run tests

### Project Structure
```
ClassPoint/
├── src/                 # React source code
├── public/             # Static assets
├── build/              # Built React app
├── dist/               # Built executables
├── build-resources/    # App icons and resources
└── website/           # Project website
```

## 📋 System Requirements
- **Windows**: Windows 10 or later (64-bit)
- **macOS**: macOS 10.14 or later
- **Linux**: Ubuntu 18.04 or equivalent

## 🔧 Troubleshooting

### Common Issues
1. **"npm not found"** - Install Node.js first
2. **Build fails** - Try deleting `node_modules` and running `npm install` again
3. **App won't start** - Check if all dependencies are installed

### Getting Help
- Check the [Issues](https://github.com/Windows-Concept/ClassPoint/issues) page
- Create a new issue if you encounter problems

## 📝 License
This project is licensed under the MIT License - see the LICENSE file for details.