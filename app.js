const songTable = document.getElementById('songTable')

var songs = [['song1', 'artist1', 'album1'], ['song2', 'artist2', 'album2'], ['song3', 'artist3', 'album3']]

function appendSongs(rows) {
    const songRow = document.createElement('tr')
    const songElement = document.createElement('td')
    rows.forEach(things => {
        things.forEach(element => {
            songElement.innerText = element
            songRow.append(songElement)
        })
        songTable.append(songRow)
    })
}

appendSongs(songs)