const {getTheLastItem} = require('../../utils/commands')
const Messages = require('../../assets/constant/messages')

module.exports = {
    name: 'resume',
    description: 'Resume the music',
    guildOnly: true,
    directory: getTheLastItem(__dirname),
    execute(message){
        if(!message.member.voice.channel){
            return message.channel.send(Messages.USER_NOT_IN_VOICE_CHANNEL)
        }

        if(!message.client.player.isPaused(message)){
            return
        }

        const player = message.client.player
        player.resume(message)
    }
}