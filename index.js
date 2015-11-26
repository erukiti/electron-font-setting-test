/* global __dirname */

var app = require('electron').app

var BrowserWindow = require('browser-window')

app.on('window-all-closed', () => {
  app.quit()
})

var openBrowser = (packet) => {
  var win = new BrowserWindow({
    width: packet.width,
    height: packet.height,
  })
  win.loadURL(`file://${__dirname}/renderer.html`)
  win.webContents.on('did-finish-load', () => {
    // win.webContents.send 'open', packet
  })
  return win
}

app.on('ready', () => {
  openBrowser({
    width: 800,
    height: 600,  
  })
})
