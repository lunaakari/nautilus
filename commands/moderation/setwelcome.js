const {getTheLastItem} = require('../../utils/commands')
const {updateWelcome, deleteWelcome} = require('../../utils/welcome')
const Messages = require('../../assets/constant/messages')

module.exports = {
    name: 'setwelcome',
    aliases: ['welcome','greeting'],
    description: 'Send a greeting when your server has a new member',
    args: true,
    usage: '<off> || <channel> <The message you want to use> \n\n {member}: tag the new member \n {server}: name of the server \n {membercount}: number of members in this server',
    directory: getTheLastItem(__dirname),
    guildOnly: true,
    mentionChannel: true,
    userPermission: ['ADMINISTRATOR'],
    requirePermission: ['MANAGE_MESSAGES'],
    execute: async function (message, args) {
        if (args.length < 2 || message.mentions.channels.first().id !== args[0].match('\[0-9]+')[0]) {
            if(args[0] === "off") {
                message.channel.send(Messages.TURN_OFF_WELCOME)
                return await deleteWelcome(message)
            }

            return message.channel.send(Messages.NOT_ENOUGH_ARGS)
        }

        const channelId = args.shift().match('\[0-9]+')[0]
        const msg = args.join(' ')

        await updateWelcome(message, channelId, msg)
        message.channel.send(Messages.UPDATED_WELCOME_SUCCESS)
    }
}