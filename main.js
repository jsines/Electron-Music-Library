<<<<<<< HEAD
const { app, BrowserWindow}  = require('electron')
const sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('music-library')
=======
const { app, BrowserWindow } = require('electron')
>>>>>>> 861d5cea20296562ca82f527ae9ad3e43c70e0c9

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 500,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
    
  })

  




  // and load the index.html of the app.
  win.loadFile('index.html')
}



app.whenReady().then(createWindow)