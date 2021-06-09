require('dotenv').config()
const fs = require('fs')
const Discord = require('discord.js')
const token = process.env.token
const DisTube = require('distube')
const emotes = require('./assets/constant/emotes.json')
const winston = require('winston')
const dayjs = require('dayjs')
const Keyv = require('keyv')

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: `../${process.env.botname}LOG`}),
    ],
    format: winston.format.printf(log => `${dayjs(new Date()).format('DD/MM/YYYY HH:mm:ss')}: [${log.level.toUpperCase()}] - ${log.message}`),
})

const client = new Discord.Client()
const commandsFolder = fs.readdirSync('./commands')
const eventFiles = fs.readdirSync('./events/common-events').filter(name => name.endsWith('.js'))
const audioEventFiles = fs.readdirSync('./events/audio-events').filter(name => name.endsWith('.js'))

client.commands = new Discord.Collection()
client.player = new DisTube(client, {searchSongs: true, highWaterMark: 1<<25})
client.emotes = emotes
client.logger = logger
client.prefixes = new Keyv()
client.welcomes = new Keyv()

commandsFolder.forEach(folder => {
    const filesList = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith('.js'))
    filesList.forEach(file => {
        const command = require(`./commands/${folder}/${file}`)
        client.commands.set(command.name, command)
    })
})

client.login(token)

eventFiles.forEach(file => {
    const event = require(`./events/common-events/${file}`)
    if(event.once)
        client.once(event.name, async (...args) => await event.execute(...args, client))
    else
        client.on(event.name,async (...args) => await event.execute(...args, client))
})

audioEventFiles.forEach(file => {
    const event = require(`./events/audio-events/${file}`)
    if(event.once)
        client.player.once(event.name, (...args) => event.execute(...args))
    else
        client.player.on(event.name, (...args) => event.execute(...args))
})