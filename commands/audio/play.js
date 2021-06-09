const {getTheLastItem} = require('../../utils/commands')
const Messages = require('../../assets/constant/messages')

module.exports = {
    name: 'play',
    args: true,
    usage: '<name/link of the song/playlist you want to play>',
    description: 'Play a song from YouTube',
    aliases: ['p'],
    guildOnly: true,
    requirePermission: ['CONNECT','SPEAK'],
    directory: getTheLastItem(__dirname),
    execute(message, args){
        if(!message.member.voice.channel){
            return message.channel.send(Messages.USER_NOT_IN_VOICE_CHANNEL)
        }

        if(message.member.voice.channel !== message.guild.me.voice.channel){
            message.member.voice.channel.join()
        }

        const player = message.client.player
        const song = args.join(' ')
        player.play(message, song)
    }
}