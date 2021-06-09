const { getEmbedAddList } = require('../../assets/audio/create-audio-embed')

module.exports = {
    name: 'addList',
    execute(message, queue, playlist){
        const m = getEmbedAddList(message, queue, playlist)

        message.channel.send(m)
    }
}