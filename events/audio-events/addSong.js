const {getEmbedSong} = require('../../assets/audio/create-audio-embed')

module.exports = {
    name: 'addSong',
    execute(message, queue, song){
        const m = getEmbedSong(message, queue, song)

        message.channel.send(m)
    }
}