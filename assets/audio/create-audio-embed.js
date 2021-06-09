const { MessageEmbed } = require("discord.js")
const embedReplyHeader = require("../embed-reply-header")
const Pagination = require('discord-paginationembed')


function getEmbedNowPlayingSong(message, queue){

    const song = queue.songs[0]
    const songs = queue.songs
    const repeat = queue.repeatMode
    const remaining = queue.songs.length

    const reply = new MessageEmbed()
    reply.setColor(embedReplyHeader.color)
    .setAuthor('Now playing')
    .setThumbnail(song.thumbnail)
    .setTitle(song.name)
    .setURL(song.url)
    .addField('Remaining in queue', remaining - 1, true)
    .addField('Duration', `${song === songs[0] ? `*${queue.formattedCurrentTime}*/${song.formattedDuration}` : `${song.formattedDuration}`}`, true)
    .addField('Requested by', song.user.tag, true)
    .setFooter(`Repeat: ${repeat === 1 ? (repeat === 2 ? 'Entire queue' : 'This song') : 'None'}`, message.guild.me.user.avatarURL())

    return reply
}

function getEmbedSong(message, queue, song){

    const songs = queue.songs
    const repeat = queue.repeatMode
    const remaining = queue.songs.length

    const reply = new MessageEmbed()
    reply.setColor(embedReplyHeader.color)
    .setAuthor('Added a song', message.author.avatarURL({format: 'png', dynamic: true}))
    .setThumbnail(song.thumbnail)
    .setTitle(song.name)
    .setURL(song.url)
    .addField('Remaining in queue', remaining - 1, true)
    .addField('Duration', `${song === songs[0] ? `*${queue.formattedCurrentTime}*/${song.formattedDuration}` : `${song.formattedDuration}`}`, true)
    .addField('Requested by', song.user.tag, true)
    .setFooter(`Repeat: ${repeat === 1 ? (repeat === 2 ? 'Entire queue' : 'This song') : 'None'}`, message.guild.me.user.avatarURL())

    return reply
}


function getEmbedQueue(message){
    const queue = message.client.player.getQueue(message)
    const pages = []
    const embedPages = []
    let p = []
    //const totalTime = queue.songs.reduce((totalTime, song) => totalTime + song.duration, 0) - ${formatDuration(totalTime)}

    queue.songs.forEach(song => {
        if(p.length < 10){
            p.push({index: queue.songs.indexOf(song), song: song})
        }else{
            pages.push(p)
            p.splice(0, 10)
        }

        if(queue.songs.length <= 10){
            pages.push(p)
        }
    });

    pages.forEach(page => {
        let pg = new MessageEmbed()
        page.map((element) => {
            pg.addField(`\`${element.index === 0 ? 'Now Playing:' : `${element.index}:`}\` ${element.song.name}`, `\`${element.song.formattedDuration}\` \`Requested by: ${element.song.user.username}\``)
        })
        embedPages.push(pg)
    })

    const m = new Pagination.Embeds()
    m.setArray(embedPages)
    .setAuthorizedUsers([message.author.id])
    .setChannel(message.channel)
    .setTitle(`\`${message.client.emotes.greenCircle} ${message.guild.name}'s Queue\``)
    .setAuthor(embedReplyHeader.author.name, message.guild.me.user.avatarURL())
    .setColor(embedReplyHeader.color)
    .build()
}

function getEmbedAddList(message, queue, playlist){
    const repeat = queue.repeatMode
    const queueLength = queue.songs.length
    const playlistLength = playlist.songs.length
    
    const m = new MessageEmbed()
    m.setColor(embedReplyHeader.color)
    .setAuthor('Queued a list', message.author.avatarURL({format: 'png', dynamic: true}))
    .setThumbnail(playlist.thumbnail.url)
    .setDescription(playlist.name)
    .addField('Position in queue', queueLength - playlistLength === 0 ? 'Now' : queueLength - playlistLength + 1, true)
    .addField('Duration', playlist.formattedDuration, true)
    .addField('Requested by', playlist.user.tag, true)
    .setFooter(`Repeat: ${repeat === 1 ? (repeat === 2 ? 'Entire queue' : 'This song') : 'None'}`, message.guild.me.user.avatarURL())

    return m
}

function getEmbedSearchResult(message, result){
    const m = new MessageEmbed()
    m.setColor(embedReplyHeader.color)
    .setAuthor(`${message.client.emotes.search} Search Result`, message.author.avatarURL({format: 'png', dynamic: true}))
    .setFooter('Pick one of above options to play music. This message will expire in 60 seconds', message.guild.me.user.avatarURL())

    result.map((song, i) => {
        if(!song.isLive)
            m.addField(`\`${i+1}:\` ${song.name}`, `Duration: \`${song.formattedDuration}\` | Views: \`${song.views}\``)
    })
    m.addField('`c:` Cancel', 'Cancel search request')

    return m
}

module.exports = { getEmbedNowPlayingSong, getEmbedQueue, getEmbedAddList, getEmbedSearchResult, getEmbedSong }