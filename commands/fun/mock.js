const {getTheLastItem} = require('../../utils/commands')

module.exports = {
    name: 'mock',
    args: true,
    usage: '<message content>',
    description: 'Send a mock message to the channel',
    directory: getTheLastItem(__dirname),
    execute(message, args){
        const mockMessage = []
        args.forEach(word => {
           const tmp = word.split('')
           tmp.forEach(char => {
                if(tmp.indexOf(char) % 2 === 0)
                    tmp[tmp.indexOf(char)] = char.toUpperCase()
                else
                    tmp[tmp.indexOf(char)] = char.toLowerCase()
           })
           word = tmp.join('')
           mockMessage.push(word)
        })
        message.channel.send(mockMessage.join(' '))
    }
}