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

function GetSongsForDisplay(mode, callback) {
	var sortBy;
	switch(mode){
		case 0:
			sortBy = "song_name"
			break;
		case 1:
			sortBy = "artist_name"
			break;
		case 2:
			sortBy = "album_name"
			break;
	}
    var songName;
    var albumName;
    var artistName;
    var songs = []
    connection.query('SELECT song_name, album_name, artist_name FROM song s INNER JOIN album al ON s.album_id = al.album_id INNER JOIN artist ar ON ar.artist_id = al.artist_id ORDER BY ' + sortBy, function (err, result, fields) {
        if (err) throw err;
        Object.keys(result).forEach(function (key) {
            var row = result[key];
            songName = row.song_name;
            albumName = row.album_name;
            artistName = row.artist_name;
            var song = new Song(songName, artistName, albumName)
            songs.push(song)
        })
        return callback(songs)
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

GetSongsForDisplay(1, function(songs){
	DisplaySongsInTable(songs)
})