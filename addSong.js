var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'Music-Library'
});

connection.connect(function(err) {
    if (err) throw err;
});

function addSong(){
	var songName = document.getElementById("song-name").value
	var songArtist = document.getElementById("song-artist").value
	var songAlbum = document.getElementById("song-album").value
	var fileName = document.getElementById("song-file").value
	var coverFile = document.getElementById("cover-file").value

	connection.query("INSERT INTO artist (artist_name, artist_country) VALUES (?, 'USA')", songArtist, function (err, result){
		if (err) throw err;
		connection.query("SELECT (artist_id) FROM artist WHERE artist_name = ?", songArtist, function (err, result){
			if (err) throw err;
			connection.query("INSERT INTO album (album_name, album_cover, album_release, artist_id) VALUES (?, ?, ?, ?)", [songAlbum, coverFile, "2005-11-11",result[0].artist_id], function (err, result){
				if (err) throw err;
				connection.query("SELECT (album_id) FROM album WHERE album_name = ?", songAlbum, function (err, result){
					if (err) throw err;
					connection.query("INSERT INTO song (song_name, song_file, song_length, song_release, song_added, album_id) VALUES (?, ?, ?, ?, ?, ?)", [songName, fileName, "60", "2005-11-11", "2005-11-11", result[0].album_id], function (err, result){
						if (err) throw err;
					})
				})
			})
		})
	})	
}