const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose")

mongoose.connect('mongodb://localhost:27017/battleship')
    .then(() => {
        console.log('MONGO CONNECTION OPEN')
    })
    .catch((err) => {
        console.log('mongo connection error!', err)
    })

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    won: {
        type: Number,
        default: 0
    },
    lost: {
        type: Number,
        default: 0
    }
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)