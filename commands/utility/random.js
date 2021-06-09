const botname = process.env.botname
const {getTheLastItem} = require('../../utils/commands')

module.exports = {
    name: "random",
    description: `Return a random number in a range`,
    aliases: ['rand'],
    usage: "<min value> <max value>",
    directory: getTheLastItem(__dirname),
    execute(message, args) {
        const min = +args[0]
        const max = +args[1]
        const randomNum = Math.floor(Math.random() * (max - min + 1) + min)

        if(isNaN(randomNum)){
            return message.reply(`Your parameters are not correct ${message.client.emotes.error}`)
        }

        message.channel.send(`${botname} chooses: ${randomNum}`)
    }
}
