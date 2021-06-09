const { getPrefix } =require('../../utils/prefix')

module.exports = {
    name: 'message',
    async execute(message){
        if(message.guild)
        {
            const guild = message.guild

            const prefix = await getPrefix(message) //require('../config.json')

            if(!message.author.bot && message.content.startsWith(prefix)){
                let args = message.content.slice(prefix.length).trim().split(/ +/)
                let commandName =  args.shift().toLowerCase()
                let missingArgsReply = `You didn't provide any argument, ${message.author}!`
        
                const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
                    
                if(!command)
                    return
        
                if(command.args && !args.length || command.mentionUser && (message.mentions.everyone || message.mentions.roles.size > 0) || command.mentionChannel && message.mentions.channels.size < 0){
                    missingArgsReply+=`\nThe proper usage wouid be: \`${prefix}${command.name} ${command.usage}\``
                    return message.channel.send(missingArgsReply)
                }

                if(command.userPermission){
                    const isNotExecutable = command.userPermission.map((perms) => message.member.hasPermission(perms)).some((perms) => perms === false)
                    if(isNotExecutable)
                        return message.channel.send('You don\'t have permission to do that')
                }

                if(command.requirePermission){
                    const isNotExecutable = command.requirePermission.map((perms) => guild.me.hasPermission(perms)).some((perms) => perms === false)
                    if(isNotExecutable)
                        return message.channel.send('I don\'t have permission to do that')    
                }
                    
                try{
                    command.execute(message, args)
                }catch(err){
                    message.reply(`\`${prefix}${commandName}\` can't execute because of an unknown error`)
                    message.client.logger.log('error', err)
                }
            }
        }else{
            const prefix =  process.env.prefix //require('../config.json')

            if(!message.author.bot && message.content.startsWith(prefix)){
                let args = message.content.slice(prefix.length).trim().split(/ +/)
                let commandName =  args.shift().toLowerCase()
                let missingArgsReply = `You didn't provide any argument, ${message.author}!`
        
                const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
                    
                if(!command)
                    return
        
                if(command.args && !args.length || command.mentionUser && (message.mentions.everyone || message.mentions.roles.size > 0)){
                    missingArgsReply+=`\nThe proper usage wouid be: \`${prefix}${command.name} ${command.usage}\``
                    return message.channel.send(missingArgsReply)
                }

                if(command.guildOnly){
                    return message.channel.send('You need to use this command in a TextChannel of a Server!')
                }
                    
                try{
                    command.execute(message, args)
                }catch(err){
                    message.reply(`\`${prefix}${commandName}\` can't execute because of an unknown error`)
                    message.client.logger.log('error', err)
                }
            }
        }
    }
}