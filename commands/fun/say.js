const {getTheLastItem} = require('../../utils/commands')

module.exports = {
    name: 'say',
    args: true,
    usage: '<message content>',
    description: 'Send a message to the channel',
    directory: getTheLastItem(__dirname),
    execute(message, args){
        message.channel.send(args.join(' '))
    }
}