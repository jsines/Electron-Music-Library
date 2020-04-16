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
    var fileName;
    var albumCover;
    var songs = []
    connection.query('SELECT song_name, album_name, artist_name, song_file, album_cover FROM song s INNER JOIN album al ON s.album_id = al.album_id INNER JOIN artist ar ON ar.artist_id = al.artist_id ORDER BY ' + sortBy, function (err, result, fields) {
        if (err) throw err;
        Object.keys(result).forEach(function (key) {
            var row = result[key];
            songName = row.song_name;
            albumName = row.album_name;
            artistName = row.artist_name;
            fileName = row.song_file;
            albumCover = row.album_cover;
            var song = new Song(songName, artistName, albumName, fileName, albumCover)
            songs.push(song)
        })
        return callback(songs)
    })
}

function PlaySong(songFile, coverFile){
	changeNowPlaying(songFile)
	changeAlbumArtwork(coverFile)
}

function DisplaySongsInTable(songs){
    var songRow
    var songData
    const songValues = Object.values(songs)
    for (const value of songValues){
        songRow = songTable.insertRow(-1)
        Object.keys(value).forEach(function (key) {
        	if(key != "songFile" && key != "albumCover"){
        		console.log(key)
            	songData = songRow.insertCell(-1)
            	songData.innerHTML = value[key]
            }
        })
        songPlay = songRow.insertCell(-1)
        console.log(value["albumCover"])
        songPlay.innerHTML = "<button type='button' onClick='PlaySong(\"" + value["songFile"] + "\", \"" + value["albumCover"] + "\")'>Play</button>"
    }
}

class Song {
    constructor(songName, songArtist, songAlbum, songFile, albumCover) {
        this.songName = songName;
        this.songArtist = songArtist;
        this.songAlbum = songAlbum;
        this.songFile = songFile;
        this.albumCover = albumCover;
    }
}

function GetSongsHelper(){
	songTable.innerHTML = "<tr><th>Song</th><th>Artist</th><th>Album</th><th>Play</th></tr>"
	let mode;
	if(document.getElementById("song_radio").checked){
		mode = 0;
	}else if(document.getElementById("artist_radio").checked){
		mode = 1;
	}else if(document.getElementById("album_radio").checked){
		mode = 2;
	}
	GetSongsForDisplay(mode, function(songs){
		DisplaySongsInTable(songs)
	})
}
