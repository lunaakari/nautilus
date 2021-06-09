const { getEmbedNowPlayingSong } = require('../../assets/audio/create-audio-embed')

module.exports = {
    name: 'playSong',
    execute(message, queue, song){
        const m = getEmbedNowPlayingSong(message, queue, song)

        message.channel.send(m)
    }
}