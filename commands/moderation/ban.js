const {getTheLastItem} = require('../../utils/commands')
const Messages = require('../../assets/constant/messages')

module.exports = {
    name: 'ban',
    description: 'Ban a member from your server in 7 days',
    usage: '<tag a member>',
    args: true,
    directory: getTheLastItem(__dirname),
    guildOnly: true,
    mentionUser: true,
    userPermission: ['BAN_MEMBERS'],
    requirePermission: ['BAN_MEMBERS'],
    execute: async function (message, args) {
        const guild = message.guild

        message.mentions.members.forEach(member => {
            if(message.member.roles.highest.comparePositionTo(member.roles.highest) === 1) {
                if (guild.me.roles.highest.comparePositionTo(member.roles.highest) === 1)
                    member.ban({days: 7, reason: `Banned from server by ${message.author.tag}`})
                else
                    return message.channel.send(Messages.FAILED_BOT_ROLE_IS_NOT_ENOUGH)
            }else{
                return message.channel.send(Messages.FAILED_USER_ROLE_IS_EQUAL_OR_LOWER)
            }
        })
    }
}