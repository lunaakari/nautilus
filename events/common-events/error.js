module.exports = {
    name: 'error',
    execute(client, error){
        client.logger.log('error', error)
    }
}