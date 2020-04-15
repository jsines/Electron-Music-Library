const { app, BrowserWindow }  = require('electron')
const mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Music-Library'
})

connection.connect()

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