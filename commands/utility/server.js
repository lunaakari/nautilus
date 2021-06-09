const {getTheLastItem} = require('../../utils/commands')
const { getEmbedServerInfo } = require('../../assets/utility/addInfoFields')

module.exports = {
    name: 'server',
    description: `Show this server's information`,
    guildOnly: true,
    directory: getTheLastItem(__dirname),
    execute(message){
        message.channel.send(getEmbedServerInfo(message))
    }
}