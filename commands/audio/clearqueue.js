const {getTheLastItem} = require('../../utils/commands')
const Messages = require('../../assets/constant/messages')

module.exports = {
    name: 'clearqueue',
    description: 'Clear the queue',
    aliases: ['clear','cq'],
    guildOnly: true,
    directory: getTheLastItem(__dirname),
    execute(message){
        const client = message.client
        const queue = client.player.getQueue(message)
        const songs = queue ? queue.songs : null

        if(!songs)
            return message.channel.send(Messages.EMPTY_QUEUE)

        songs.splice(1, songs.length)
        return message.channel.send(Messages.CLEARED_QUEUE)
    }
}