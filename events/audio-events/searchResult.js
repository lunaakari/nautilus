const { getEmbedSearchResult } = require('../../assets/audio/create-audio-embed')

module.exports = {
    name: 'searchResult',
    execute(message, result){
        const m = getEmbedSearchResult(message, result)
        message.channel.send(m)
    }
}