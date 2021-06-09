const embedReplyHeader = require('../embed-reply-header')
const dayjs = require('dayjs')
const { MessageEmbed } = require('discord.js')

function getEmbedUserInfo(message, member){

    const roles = []
    const embed = new MessageEmbed()

    member.roles.cache.forEach(role => {
        roles.push(`\`${role.name}\``)
    })

    embed.setThumbnail(member.user.avatarURL({format: 'png', dynamic: true, size: 256}))
    .addField('ID', member.id, true)
    .addField('Nickname', member.displayName, true)
    .addField('Roles', roles.join(', '))
    .addField('Account created', dayjs(member.user.createdAt).format('HH:mm:ss, DD/MM/YYYY'), true)
    .addField('Joined date', dayjs(member.joinedAt).format('HH:mm:ss, DD/MM/YYYY'), true)
    .setAuthor(message.author.tag)
    .setColor(embedReplyHeader.color)

    return embed
}

function getEmbedServerInfo(message){
    
    const guild = message.guild
    const embed = new MessageEmbed()

    embed.setThumbnail(guild.iconURL({format: 'png', dynamic: true, size: 256}))
    .setDescription('Here some info of this server')
    .addField('Owner', guild.owner.user.tag,true)
    .addField('\u200B', '\u200B', true)
    .addField('Members', guild.memberCount,true)

    .addField('Server created', dayjs(guild.createdAt).format('HH:mm:ss, DD/MM/YYYY'), true)
    .addField('\u200B', '\u200B', true)
    .addField('Region', guild.region, true)

    .addField('Verified', guild.verified ? '✔' : '❌', true)
    .addField('\u200B', '\u200B', true)
    .addField('Booster', guild.premiumSubscriptionCount, true)
    .setAuthor(guild.name, guild.iconURL({format: 'png', dynamic: true, size: 256}))
    .setColor(embedReplyHeader.color)
    .setFooter(`Server ID: ${guild.id}`)

    return embed
}

module.exports = { getEmbedUserInfo, getEmbedServerInfo }