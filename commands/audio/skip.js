const {getTheLastItem} = require('../../utils/commands')
const Messages = require('../../assets/constant/messages')

module.exports = {
    name: 'skip',
    description: 'Skip current song',
    aliases: ['s'],
    guildOnly: true,
    directory: getTheLastItem(__dirname),
    execute(message){  
        const client = message.client
        try{
            client.player.skip(message)
            message.channel.send(`${client.emotes.skip} ${Messages.SKIPPED}`)
        }catch(err){
            console.log(err)
            message.reply(Messages.NEED_TO_PLAY_SONG)
        }
    }
}