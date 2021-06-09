const mongo = require('../mongo')
const prefixSchema = require('../schemas/prefix-schema')
const defaultPrefix = process.env.prefix

async function getPrefix(message){
    const prefixes = message.client.prefixes
    const prefix = await prefixes.get(message.guild.id) || process.env.prefix
    return prefix
}

async function updateCache(guildId, newPrefix, client) {
    await client.prefixes.set(guildId, newPrefix)
}

async function deleteACachePrefix(guildId, client){
    await client.prefixes.delete(guildId)
}

async function loadPrefixes(client) {
    await mongo().then(async (mongoose) => {
        try{
            for (const guild of client.guilds.cache) {
                let guildId = guild[1].id

                const result = await prefixSchema.findOne({_id: guildId})
                const prefix = !result ? defaultPrefix : result.prefix
                await client.prefixes.set(guildId, prefix)
            }
        }catch(err){
            client.logger.log('error', err)
        }
    })
}

async function deletePrefix(message){
    const guildId = message.guild.id
    await mongo().then(async (mongoose) => {
        await prefixSchema.findByIdAndDelete({_id: guildId})
        deleteACachePrefix(guildId, message.client)

    })
}

async function updatePrefix(message, newPrefix){
    const guildId = message.guild.id
    await mongo().then(async (mongoose) => {
        await prefixSchema.findByIdAndUpdate(
            {_id: guildId},
            {_id: guildId, prefix: newPrefix},
            {upsert: true}
            )
    })
    updateCache(guildId, newPrefix, message.client)
}

module.exports = {loadPrefixes, updatePrefix, deletePrefix, getPrefix}