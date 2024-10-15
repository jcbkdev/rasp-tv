const { app, BrowserWindow } = require('electron')
const path = require("path");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/channels")
const Channel = mongoose.model('Channel', { name: String, url: String, base64Logo: String });

const createWindow = async () => {
    const win = new BrowserWindow({
        fullscreen: true,         // Makes the window fullscreen
        frame: false,             // Removes window borders (borderless)
        alwaysOnTop: true,        // Keeps the window always on top
        skipTaskbar: true,         // Optional: Hides the app from the taskbar
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'), // Load your preload script
          contextIsolation: true, // Enables context isolation
          enableRemoteModule: false, // Disable remote module (optional)
      }
    })

    const channels = await Channel.find({}).exec();

    win.webContents.on('did-finish-load', () => {
      win.webContents.send('data-from-main', { channels: channels });
  });

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})