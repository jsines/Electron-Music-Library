var songTable = document.getElementById('songTable')
const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'Music-Library'
})
connection.connect()





function changeNowPlaying(fileName){
	var audio = document.getElementById('nowPlaying')
	audio.pause()
	audio.setAttribute('src', "musicfiles/" + fileName)
	audio.load()
	audio.play()
}

function changeAlbumArtwork(fileName){
	var image = document.getElementById('nowPlayingImage')
	image.setAttribute('src', 'albumcovers/' + fileName)
}


GetSongsForDisplay()
function GetSongsForDisplay() {
    console.log('CODE GETS HERE')
    var songName;
    var albumName;
    var artistName;
    var songs = []
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
                    console.log('The artist name is: ' + artistName)
                    var song = new Song(songName, artistName, albumName)
                    songs.push(song)
                })
            })
        })
    })
}



function GetArtistNameFromArtistID(artistId, callback){
    connection.query('SELECT artist_name from artist WHERE artist_id = ' + artistId.toString(), function (err, result, fields) {
        if(err) throw err;
        return callback(result[0].artist_name)
    })
}


function GetAlbumNameFromAlbumId(albumId, callback){
    connection.query('select album_name from album where album_id = ' + albumId.toString(), function (err, result, fields) {
        if(err) throw err;
        return callback(result[0].album_name)
    })
}

function GetArtistIdFromAlbumId(albumId, callback){
    connection.query('select artist_id from album where album_id = ' + albumId.toString(), function (err, result, fields) {
        if(err) throw err;
        return callback(result[0].artist_id)
    })
}

function DisplaySongsInTable(songs){
    var songRow
    var songData
    const songValues = Object.values(songs)
    for (const value of songValues){
        songRow = songTable.insertRow(-1)
        Object.keys(value).forEach(function (key) {
            songData = songRow.insertCell(-1)
            songData.innerHTML = value[key]
        })
    }
}

class Song {
    constructor(songName, songArtist, songAlbum) {

        this.songName = songName;
        this.songArtist = songArtist;
        this.songAlbum = songAlbum;

    }
}
