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

 //GetSongsForDisplay();

function GetSongsForDisplay() {
  var songName;
  var albumName;
  var artistName;
  var songs = [];
  connection.query('select song_name, album_id from song', function (err, result, fields) {
    if (err) throw err;
    Object.keys(result).forEach(function (key) {
      var row = result[key];
      songName = row.song_name;
      GetAlbumNameFromAlbumId(row.album_id, function (result) {
        albumName = result
      })
      GetArtistIdFromAlbumId(row.album_id, function (result) {
        GetArtistNameFromArtistID(result, function (result) {
          artistName = result
          var song = new Song(songName, artistName, albumName)
          songs.push(song)
          console.log(songs)
          DisplaySongsInTable(songs)
        })

      })
    })
  })
}

app.whenReady().then(createWindow)


// /**
//  *
//  * @param artistId, integer ID of the artist associated with the song
//  * @constructor
//  */
// function GetArtistNameFromArtistID(artistId, callback){
//     connection.query('SELECT artist_name from artist WHERE artist_id = ' + artistId.toString(), function (err, result, fields) {
//         if(err) throw err;
//         return callback(result[0].artist_name)
//     })
// }
//
// /**
//  *
//  * @param albumId, id of the album in the database that is associated with the song
//  */
// function GetAlbumNameFromAlbumId(albumId, callback){
//   connection.query('select album_name from album where album_id = ' + albumId.toString(), function (err, result, fields) {
//     if(err) throw err;
//     return callback(result[0].album_name)
//   })
// }
//
// function GetArtistIdFromAlbumId(albumId, callback){
//   connection.query('select artist_id from album where album_id = ' + albumId.toString(), function (err, result, fields) {
//     if(err) throw err;
//     return callback(result[0].artist_id)
//   })
// }
//
// function DisplaySongsInTable(songs){
//  const songValues = Object.values(songs)
//   for (const value of songValues){
//     Object.keys(value).forEach(function (key) {
//       console.log(value[key])
//     })
//   }
// }
//
//
// /**
//  * Song class to store the values of the keys from the queries that will be used to play the songs and
//  * get the information to display the songs to the user.
//  */
// class Song {
//   constructor(songName, songArtist, songAlbum) {
//
//     this.songName = songName;
//     this.songArtist = songArtist;
//     this.songAlbum = songAlbum;
//
//   }
// }