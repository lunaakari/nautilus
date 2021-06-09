const mongo = require('../../mongo')
const {loadPrefixes} = require('../../utils/prefix')
const {loadWelcomes} = require('../../utils/welcome')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        const prefix = process.env.prefix //require('../config.json')

        client.logger.log('info', `${client.user.tag} is online now!`);
        await client.user.setPresence({activity: {name: `${prefix}help for more info!`}, status: 'playing'})
        await mongo().then((mongoose) => {
            try{
                client.logger.log('info', "Connected to MongoDB")
            }catch(err){
                client.logger.log('error', err)
            }
        })

        await loadPrefixes(client)
        await loadWelcomes(client)
    }
}