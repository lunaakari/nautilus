const {getTheLastItem} = require('../../utils/commands')
const { getEmbedNowPlayingSong } = require('../../assets/audio/create-audio-embed')
const Messages = require('../../assets/constant/messages')

module.exports = {
    name: 'nowplaying',
    description: 'Show what song is playing',
    aliases: ['np'],
    guildOnly: true,
    directory: getTheLastItem(__dirname),
    execute(message){
        const client = message.client
        const queue = client.player.getQueue(message)

        if(!queue){
            return message.channel.send(Messages.NOTHING_IS_PLAYING)
        }

        const m = getEmbedNowPlayingSong(message, queue)

        message.channel.send(m)
    }
}