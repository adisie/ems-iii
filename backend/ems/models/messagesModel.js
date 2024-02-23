const mongoose = require('mongoose')

// messages schema
const messagesSchema = new mongoose.Schema({
    connectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Connection',
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
    },
    files: {
        type: Array,
    },
},{
    timestamps: true,
})

// exports
module.exports = mongoose.model('Message',messagesSchema)