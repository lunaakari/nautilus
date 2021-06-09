const {getTheLastItem} = require('../../utils/commands')

module.exports = {
    name: 'ping',
    description: `Ping to me`,
    directory: getTheLastItem(__dirname),
    async execute(message) {
        const reply = await message.channel.send('Calculating...')
        const ping = reply.createdTimestamp - message.createdTimestamp
        reply.edit(`Latency: ${ping}ms, API latency: ${message.client.ws.ping}ms`)
    }
}