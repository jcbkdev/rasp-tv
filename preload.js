const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    receiveData: (callback) => ipcRenderer.on('data-from-main', callback),
});