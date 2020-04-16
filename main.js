const { app, BrowserWindow, Menu, ipc }  = require('electron')

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

  const template = [
    {
      label: 'File',
      submenu: [
        { role: 'quit' },
        {
          label: 'Add Song',
          click() {
            addSongWindow.loadFile('addSong.html')
            addSongWindow.show()
          }
        },
        {
          label: 'Remove Song',
          click() {
            removeSongWindow.loadFile('removeSong.html')
            removeSongWindow.show()
          }
        }
      ]
    }
  ]


  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  var addSongWindow = new BrowserWindow({
    width: 400,
    height: 250,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }    
  })

  var removeSongWindow = new BrowserWindow({
    width: 400,
    heigh: 250,
    show:false,
    webPreferences: {
      nodeIntegration: true
    }    
  })
  // and load the index.html of the app.
  win.loadFile('index.html')

}

app.whenReady().then(createWindow)

