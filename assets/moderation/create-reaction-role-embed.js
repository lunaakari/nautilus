const embedReplyHeader = require('../embed-reply-header')
const { MessageEmbed } = require('discord.js')

function getEmbedReactionRole(channelToSend, title, description){
    const guild = channelToSend.guild

    const m = new MessageEmbed()
    m.setTitle(title)
        .setDescription(description)
        .setAuthor(embedReplyHeader.author.name, guild.me.user.avatarURL())
        .setColor(embedReplyHeader.color)
    return m
}


module.exports = { getEmbedReactionRole }