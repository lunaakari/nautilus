const mongoose = require('mongoose')
const dbPath = process.env.dbPath

module.exports = async () => {
    mongoose.set('useFindAndModify', false)
    await mongoose.connect(dbPath, {useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true})
    return mongoose
}