const {getTheLastItem} = require('../../utils/commands')
const Messages = require('../../assets/constant/messages')

module.exports = {
    name: 'kick',
    description: 'Kick a member out of your server',
    usage: '<tag a member>',
    directory: getTheLastItem(__dirname),
    guildOnly: true,
    mentionUser: true,
    userPermission: ['KICK_MEMBERS'],
    requirePermission: ['KICK_MEMBERS'],
    execute: async function (message) {
        const guild = message.guild

        message.mentions.members.forEach(member => {
            if(message.member.roles.highest.comparePositionTo(member.roles.highest) === 1) {
                if (guild.me.roles.highest.comparePositionTo(member.roles.highest) === 1)
                    member.kick(`Kicked out by ${message.author.tag}`)
                else
                    return message.channel.send(Messages.FAILED_BOT_ROLE_IS_NOT_ENOUGH)
            }else{
                return message.channel.send(Messages.FAILED_USER_ROLE_IS_EQUAL_OR_LOWER)
            }
        })
    }
}