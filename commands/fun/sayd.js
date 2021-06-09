const {getTheLastItem} = require('../../utils/commands')

module.exports = {
    name: 'sayd',
    args: true,
    usage: '<message content>',
    description: 'Send a message to the channel and delete your command',
    directory: getTheLastItem(__dirname),
    guildOnly: true,
    userPermission: ['MANAGE_MESSAGES'],
    requirePermission: ['MANAGE_MESSAGES'],
    execute(message, args){
        message.delete().catch((err) => message.client.logger.log('error', err))
        message.channel.send(args.join(' '))
    }
}