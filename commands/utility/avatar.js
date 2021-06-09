const {getTheLastItem} = require('../../utils/commands')

module.exports = {
    name: 'avatar',
    description: 'Get an user\'s avatar',
    usage: '[member]',
    mentionUser: true,
    directory: getTheLastItem(__dirname),
    execute(message){
        if(message.mentions.users.size === 0)
            message.channel.send(message.author.avatarURL({format: 'png', size: 512, dynamic: true}))
        else
            message.channel.send(message.mentions.users.first().avatarURL({format: 'png', size: 512, dynamic: true}))
    }
}