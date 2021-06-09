const {getTheLastItem} = require('../../utils/commands')
const {getEmbedQueue} = require('../../assets/audio/create-audio-embed')
const Messages = require('../../assets/constant/messages')


module.exports = {
    name: 'queue',
    description: 'Get the music queue',
    aliases: ['q'],
    guildOnly: true,
    directory: getTheLastItem(__dirname),
    execute(message) {
        if (!message.client.player.getQueue(message) || message.client.player.getQueue(message).songs.length === 0)
            return message.channel.send(Messages.QUEUE_IS_EMPTY)

        getEmbedQueue(message)
    }
}