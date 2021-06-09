const Messages = require('../../assets/constant/messages')

module.exports = {
    name: 'empty',
    execute(message){
        message.channel.send(Messages.VOICE_CHANNEL_IS_EMPTY)
    }
}