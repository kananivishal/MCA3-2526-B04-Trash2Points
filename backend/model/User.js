const mongoose = require('mongoose')
const { report } = require('../routes')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            require: true
        },
        email: {
            type: String,
            trim: true,
            required: true
        },
        phoneno: {
            type: String,
            trim: true,
            minlength: 10,
            mexlength: 10,
            require: true,
            unique: true
        },
        address: {
            type: String,
            require: true
        },
        password: {
            type: String,
            trim: true,
            minlength: 6,
            required: true
        },
        role: {
            type: String,
            default: 'user'
        },
        report: {
            type: mongoose.Schema.ObjectId,
            ref: 'Report'
        }
    }
)

const User = mongoose.model('User', userSchema)

module.exports = { User }