const {getTheLastItem} = require('../../utils/commands')
const Messages = require('../../assets/constant/messages')

module.exports = {
    name: 'leave',
    description: 'Stop the music and disconnect from channel',
    aliases: ['l', 'stop'],
    guildOnly: true,
    directory: getTheLastItem(__dirname),
    execute(message){
        const client = message.client
        const guild = message.guild
        if(!guild.me.voice.channel)
            return message.channel.send(Messages.NOT_IN_VOICE_CHANNEL)
        
        client.currSong = null
        guild.me.voice.channel.leave()
        message.channel.send(`${Messages.LEAVE_VOICE_CHANNEL} ${message.client.emotes.bye}`)
    }
}