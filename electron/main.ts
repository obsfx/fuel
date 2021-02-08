// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron';
import path from 'path';

const createWindow = () => {
  const mainWindow: BrowserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const startURL: string = process.env.ELECTRON_START_URL || path.join(__dirname, '/../build/index.html');
  mainWindow.loadFile(startURL);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
