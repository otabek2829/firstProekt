const mongoose = require('mongoose')
const schema = mongoose.Schema
const moment = require('moment')

const DbRegister = new schema({
    names: {
        type: String,
        maxlength : 12
        
    },
    login: {
        type: String,
        maxlength : 12
    },
    phone: {
        type: Number,
        maxlength : 12
    },
    dateTime: {
        type: Date,
        default : Date.now()
    },
    password: {
        type: String,
        minlength : 6
    }
})

module.exports = mongoose.model('RegUser', DbRegister)