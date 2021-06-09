const {updatePrefix, deletePrefix} = require('../../utils/prefix')
const botname = process.env.botname
const {getTheLastItem} = require('../../utils/commands')
const Messages = require('../../assets/constant/messages')

module.exports = {
    name: 'prefix',
    usage: '<new prefix>',
    args: true,
    description: `Change ${botname}\'s prefix in this server`,
    guildOnly: true,
    directory: getTheLastItem(__dirname),
    userPermission: ['ADMINISTRATOR'],
    async execute(message, args){
        const newPrefix = args[0]

        if(newPrefix === process.env.prefix){
            await deletePrefix(message)
            return message.channel.send(`${Messages.PREFIX_CHANGED} \`${newPrefix}\``)
        }

        await updatePrefix(message, newPrefix)
        message.channel.send(`${Messages.PREFIX_CHANGED} \`${newPrefix}\``)
    }
}