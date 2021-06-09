const Messages = require('../../assets/constant/messages')

module.exports = {
    name: 'searchCancel',
    execute(message){
        message.channel.send(Messages.REQUEST_CANCELLED)
    }
}