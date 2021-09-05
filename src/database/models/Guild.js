const { Schema, model } = require('mongoose')

const guildSchema = new Schema({
    _id: String,
    welcome: {
        channel: String
    }
})

const scholSchema = new Schema({
    scholarship: {
        alunos: String,
        idAlunos: String
    }
})

module.exports = model('guilds', guildSchema), model('scholarship', scholSchema) 