const { getEmbedAddList, getEmbedSong  }= require('../../assets/audio/create-audio-embed')

const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'playList',
    execute(message, queue, playlist, song){          
        
        const playlistMessage = getEmbedAddList(message, queue, playlist)
        const songMessage = getEmbedSong(message, queue, song)
        
        message.channel.send(playlistMessage)
        message.channel.send(songMessage)
    }
}