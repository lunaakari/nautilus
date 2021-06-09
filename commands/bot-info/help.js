const botname = process.env.botname
const {getEmbedHelp, getEmbedCommandHelp} = require('../../assets/bot-info/create-help-embed')
const {getTheLastItem} = require('../../utils/commands')
const Messages = require('../../assets/constant/messages')

module.exports = {
    name: "help",
    description: `Show ${botname}'s commands`,
    aliases: ['h', 'commands'],
    usage: '[command]',
    directory: getTheLastItem(__dirname),
    async execute(message, args) {
        const commands = message.client.commands

        if (!args.length) {
            return message.channel.send(await getEmbedHelp(message))
        }

        const cmdName = args[0].toLowerCase()
        const command = commands.get(cmdName) ? commands.get(cmdName) : commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName))

        if (!command)
            return message.channel.send(Messages.COMMAND_NOT_FOUND)


        message.channel.send(await getEmbedCommandHelp(message, command))
    }
}
