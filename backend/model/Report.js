const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        image: {
            type: String,
            required: true
        },
        location: {
            latitude: {
                type: String,
                require: true
            },
            longitude: {
                type: String,
                require: true
            },
            address: {
                type: String
            }
        },
        description: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'cleaned'],
            default: 'pending'
        },
        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }, {
    timestamps: true
})

// const Report = 
module.exports = mongoose.model('Report', reportSchema)