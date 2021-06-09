const {getTheLastItem} = require('../../utils/commands')
const { getEmbedUserInfo } = require('../../assets/utility/addInfoFields')

module.exports = {
    name: 'info',
    usage: '[member]',
    description: `Show a guild member's information`,
    aliases: ['i'],
    mentionUser: true,
    directory: getTheLastItem(__dirname),
    execute(message) {
        const members = message.mentions.members

        if (members.size === 0) {
            const m = getEmbedUserInfo(message, message.member)
            return message.channel.send(m)
        }

        members.forEach(member => {
            const m = getEmbedUserInfo(message, member)
            message.channel.send(m)
        })
    }
}