const mongo = require('../mongo')
const welcomeSchema = require('../schemas/welcome-schema')

async function getWelcome(member){
    const welcomes = member.client.welcomes
    const msg = await welcomes.get(member.guild.id)
    return mentionMessage(msg, member)
}

async function updateCache(guildId, data, client) {
    await client.welcomes.set(guildId, data)
}

async function deleteACachedWelcome(guildId, client){
    await client.welcomes.delete(guildId)
}

async function loadWelcomes(client) {
    await mongo().then(async (mongoose) => {
        try{
            for (const guild of client.guilds.cache) {
                let guildId = guild[1].id

                const result = await welcomeSchema.findOne({_id: guildId})

                if(!result)
                    continue

                const data = {channelId: result.channelId, message: result.message}
                await client.welcomes.set(guildId, data)
            }
        }catch(err){
            client.logger.log('error', err)
        }
    })
}

async function deleteWelcome(message){
    const guildId = message.guild.id
    await mongo().then(async (mongoose) => {
        await welcomeSchema.findByIdAndDelete({_id: guildId})
        await deleteACachedWelcome(guildId, message.client)

    })
}

async function updateWelcome(message, channelId, newWelcome){
    const guildId = message.guild.id
    await mongo().then(async (mongoose) => {
        await welcomeSchema.findByIdAndUpdate(
            {_id: guildId},
            {_id: guildId, channelId, message: newWelcome},
            {upsert: true}
        )
    })
    await updateCache(guildId, {channelId, message: newWelcome}, message.client)
}

function mentionMessage(msg, member){
    const newMemberId = member.id
    const guildName = member.guild.name
    const memberCount = member.guild.memberCount

    if(!msg)
        return

    msg.message = msg.message.replace('{member}', `<@${newMemberId}>`).replace('{server}', `${guildName}`).replace('{membercount}', `${memberCount}`)
    return msg
}

module.exports = {loadWelcomes, updateWelcome, deleteWelcome, getWelcome}