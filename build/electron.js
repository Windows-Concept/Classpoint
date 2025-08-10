const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

// Check if in development mode
const isDev = process.env.NODE_ENV === 'development' || process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath);

let mainWindow;
let widgetWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    icon: path.join(__dirname, 'icon.png'),
    show: false,
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createWidgetWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  widgetWindow = new BrowserWindow({
    width: 300,
    height: 400,
    x: width - 320,
    y: 20,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    transparent: true,
  });

  widgetWindow.loadURL(
    isDev
      ? 'http://localhost:3000?widget=true'
      : `file://${path.join(__dirname, '../build/index.html')}?widget=true`
  );

  widgetWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  
  widgetWindow.on('closed', () => {
    widgetWindow = null;
  });
}

app.whenReady().then(() => {
  createMainWindow();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers
ipcMain.handle('show-widget', () => {
  if (!widgetWindow) {
    createWidgetWindow();
  } else {
    widgetWindow.show();
  }
});

ipcMain.handle('hide-widget', () => {
  if (widgetWindow) {
    widgetWindow.hide();
  }
});

ipcMain.handle('close-widget', () => {
  if (widgetWindow) {
    widgetWindow.close();
    widgetWindow = null;
  }
});

ipcMain.handle('update-widget-position', (event, { x, y }) => {
  if (widgetWindow) {
    widgetWindow.setPosition(x, y);
  }
});