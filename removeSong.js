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

function removeSong(){
	console.log("Hello1")
	var songName = document.getElementById("song-name").value
	var songArtist = document.getElementById("song-artist").value
	var songAlbum = document.getElementById("song-album").value

	connection.query("DELETE FROM song WHERE song_name = ?", songName, function (err, result){
		if (err) throw err;
		console.log("Hello3")
		console.log("Number of records deleted: " + result.affectedRows)
	})
}
