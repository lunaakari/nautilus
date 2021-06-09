const {getWelcome} = require('../../utils/welcome')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member){
        const client = member.client
        const welcome = await getWelcome(member)

        if(!welcome)
            return

        const channelToSend = welcome.channelId
        client.channels.cache.get(channelToSend).send(welcome.message)
    }
}