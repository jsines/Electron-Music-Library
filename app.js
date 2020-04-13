
var songTable = document.getElementById('songTable')
console.log(songTable)




var songs = [['song1', 'artist1', 'album1'], ['song2', 'artist2', 'album2'], ['song3', 'artist3', 'album3']]

function appendSongs(rows) {
    const songRow
    const songElement
    rows.forEach(things => {
        songRow = songTable.insertRow(-1)
        things.forEach(element => {
            
            songElement = songRow.insertCell(-1)
            songElement.innerHTML = element
        })
        
    })



}

appendSongs(songs)
