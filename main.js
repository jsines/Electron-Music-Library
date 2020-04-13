const { app, BrowserWindow}  = require('electron');
const mysql = require('mysql');

function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 500,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  win.loadFile('index.html')
}

app.whenReady().then(createWindow);

//connection information
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'Music-Library'
});