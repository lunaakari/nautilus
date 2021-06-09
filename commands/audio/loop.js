const {getTheLastItem} = require('../../utils/commands')
const Messages = require('../../assets/constant/messages')
const {getRepeatMode} = require('../../utils/audio')

module.exports = {
    name: 'loop',
    args: true,
    usage: `<on/off/queue>`,
    description: 'Toggle loop mode on/off/queue',
    aliases: ['r', 'repeat'],
    guildOnly: true,
    directory: getTheLastItem(__dirname),
    execute(message, args){
        const prefix = process.env.prefix || message.client.prefixes.get(message.guild.id)
        const arg = args[0].trim().toLowerCase()
        const queue = message.client.player.getQueue(message)
        const validMode = ['off', 'on', 'queue']

        if(queue !== undefined){
            const mode = validMode.indexOf(arg)
            if(mode >= 0){
                message.client.player.setRepeatMode(message, mode)
                return message.channel.send(`${Messages.REPEAT_MODE} ${getRepeatMode(mode)}`)
            }
            return message.channel.send(Messages.NOT_VALID_REPEAT)
        }

        message.channel.send(Messages.ERROR_EMPTY_REPEAT)
    }
}