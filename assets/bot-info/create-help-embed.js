const botname  = process.env.botname
const embedReplyHeader = require('../embed-reply-header')
const { MessageEmbed } = require('discord.js')
const { getPrefix } =require('../../utils/prefix')

async function getEmbedHelp(message){
    const { commands } = message.client

    const prefix = await getPrefix(message)
    
    const reply = new MessageEmbed()
    reply.setColor(embedReplyHeader.color)
        .setTitle(`${botname}'s Commands`)
        .setThumbnail('https://i.imgur.com/S8APlLB.gif')
        .setDescription(`My prefix is \`${prefix}\``)
        .setAuthor(`${botname}`, message.guild.me.user.avatarURL())
        .setFooter(`For further info about a command usage, use ${prefix}help <command>`, message.guild.me.user.avatarURL())

    const categoriesSet = new Set()
    commands.forEach(command => {
        categoriesSet.add(command.directory)
    })

    categoriesSet.forEach(category => {
        const cmds = []
        commands.forEach(command => {
            if(command.directory === category)
                cmds.push(`\`${command.name}\``)
        })
        if(cmds.length) reply.addField(category, cmds.join(', '))
    })

    return reply
}

async function getEmbedCommandHelp(message, command){
    const prefix = await getPrefix(message)

    const reply = new MessageEmbed()
    reply.setColor(embedReplyHeader.color)
        .setTitle(`${command.name}`)
        .setDescription(command.description)
        .setAuthor(`${botname}`, message.guild.me.user.avatarURL())
        .addFields(
            {name: "Usage", value: `\`${prefix}${command.name}${command.usage ? ' ' + command.usage : ''}\``},
            {name: "Aliases", value: !command.aliases ? '`none`' : `\`${command.aliases.join('`, `')}\``}
        )
        .setFooter('<>: required, []: optional, ||: or')

    return reply
}

module.exports = { getEmbedHelp, getEmbedCommandHelp }